/* Huddo DJ for HCL Verse — background.js (service worker) */
'use strict';

const _api = typeof browser !== 'undefined' ? browser : chrome;

// ── SPOTIFY CONFIG ────────────────────────────────────────────────────────
// Register your Spotify app at https://developer.spotify.com/dashboard
// Set the redirect URI to the value returned by chrome.identity.getRedirectURL()
// (typically https://<extension-id>.chromiumapp.org/)
const SPOTIFY_CLIENT_ID = 'e949c14c36a54ad99998f424d4b87c0f';
const SPOTIFY_SCOPES = 'user-read-playback-state user-modify-playback-state';

// ── TOKEN HELPERS ─────────────────────────────────────────────────────────
async function getTokens() {
  return new Promise(resolve => {
    _api.storage.local.get(
      ['edj_spotify_access', 'edj_spotify_refresh', 'edj_spotify_expires'],
      r => resolve({
        access:  r.edj_spotify_access  || null,
        refresh: r.edj_spotify_refresh || null,
        expires: r.edj_spotify_expires || 0
      })
    );
  });
}

async function saveTokens({ access, refresh, expires }) {
  return new Promise(resolve => {
    _api.storage.local.set({
      edj_spotify_access:  access,
      edj_spotify_refresh: refresh,
      edj_spotify_expires: expires,
      edj_spotifyConnected: true
    }, resolve);
  });
}

// ── PKCE ──────────────────────────────────────────────────────────────────
function generateCodeVerifier() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function generateCodeChallenge(verifier) {
  const data   = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// ── SPOTIFY AUTH (PKCE flow) ──────────────────────────────────────────────
async function authorizeSpotify() {
  const redirectUrl = _api.identity.getRedirectURL();
  const verifier   = generateCodeVerifier();
  const challenge  = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    client_id:             SPOTIFY_CLIENT_ID,
    response_type:         'code',
    redirect_uri:          redirectUrl,
    code_challenge_method: 'S256',
    code_challenge:        challenge,
    scope:                 SPOTIFY_SCOPES
  });

  const authUrl = 'https://accounts.spotify.com/authorize?' + params.toString();

  const responseUrl = await new Promise((resolve, reject) => {
    _api.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, url => {
      if (_api.runtime.lastError || !url) {
        reject(new Error(_api.runtime.lastError?.message || 'Auth cancelled'));
      } else {
        resolve(url);
      }
    });
  });

  const code = new URL(responseUrl).searchParams.get('code');
  if (!code) throw new Error('No auth code received from Spotify');

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'authorization_code',
      code,
      redirect_uri:  redirectUrl,
      client_id:     SPOTIFY_CLIENT_ID,
      code_verifier: verifier
    })
  });

  if (!tokenRes.ok) throw new Error('Token exchange failed: ' + tokenRes.status);
  const tokens = await tokenRes.json();

  await saveTokens({
    access:  tokens.access_token,
    refresh: tokens.refresh_token,
    expires: Date.now() + tokens.expires_in * 1000
  });
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: refreshToken,
      client_id:     SPOTIFY_CLIENT_ID
    })
  });
  if (!res.ok) throw new Error('Token refresh failed: ' + res.status);
  const data = await res.json();
  await saveTokens({
    access:  data.access_token,
    refresh: data.refresh_token || refreshToken,
    expires: Date.now() + data.expires_in * 1000
  });
  return data.access_token;
}

async function getValidToken() {
  const { access, refresh, expires } = await getTokens();
  if (!refresh) throw new Error('Not authenticated with Spotify');
  // Use existing token if it has more than 60 s of life left
  if (access && Date.now() < expires - 60_000) return access;
  return refreshAccessToken(refresh);
}

// ── SPOTIFY PLAYBACK ──────────────────────────────────────────────────────
async function playPlaylist(uri) {
  const token = await getValidToken();
  const res = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization:  'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ context_uri: uri })
  });

  if (res.status === 404) throw new Error('No active Spotify device found. Open Spotify first.');
  if (!res.ok && res.status !== 204) {
    const raw    = await res.text().catch(() => '');
    const body   = (() => { try { return JSON.parse(raw); } catch { return {}; } })();
    const reason = body?.error?.reason || '';
    const msg    = body?.error?.message || '';
    console.error('[EmailDJ] Spotify error', res.status, reason, msg);
    if (res.status === 403 && reason === 'PREMIUM_REQUIRED') {
      throw new Error('Spotify Premium is required for playback control.');
    }
    throw new Error(msg || 'Playback error ' + res.status + (reason ? ': ' + reason : '') + (raw ? ' — ' + raw.slice(0, 120) : ''));
  }

  // Enable shuffle — fire-and-forget, don't fail playback if this errors
  fetch('https://api.spotify.com/v1/me/player/shuffle?state=true', {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + token }
  }).catch(() => {});
}

// ── URL LAUNCH (Apple Music / YouTube Music) ──────────────────────────────
function openPlaylistTab(url) {
  return _api.tabs.create({ url, active: true });
}

// ── RE-INJECTION on extension reload ─────────────────────────────────────
async function reInjectAll() {
  const { edj_verseUrl } = await new Promise(resolve =>
    _api.storage.local.get('edj_verseUrl', resolve)
  );
  if (!edj_verseUrl) return;

  const host = edj_verseUrl.replace(/^https?:\/\//, '').split('/')[0];
  const tabs = await _api.tabs.query({ url: `https://${host}/*` });

  for (const tab of tabs) {
    try {
      await _api.scripting.insertCSS({ target: { tabId: tab.id }, files: ['styles.css'] });
      await _api.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    } catch (_) { /* restricted tab — skip */ }
  }
}

// ── MESSAGE ROUTER ────────────────────────────────────────────────────────
_api.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'SPOTIFY_AUTH') {
    authorizeSpotify()
      .then(() => sendResponse({ ok: true }))
      .catch(e => sendResponse({ ok: false, error: e.message }));
    return true; // keep channel open for async response
  }

  if (msg.type === 'SPOTIFY_PLAY') {
    if (!msg.uri || !String(msg.uri).startsWith('spotify:')) {
      sendResponse({ ok: false, error: 'Invalid Spotify URI' });
      return;
    }
    playPlaylist(msg.uri)
      .then(() => sendResponse({ ok: true }))
      .catch(e => sendResponse({ ok: false, error: e.message }));
    return true;
  }

  if (msg.type === 'URL_PLAY') {
    if (!msg.url || !/^https:\/\/(music\.apple\.com|music\.youtube\.com)\//.test(msg.url)) {
      sendResponse({ ok: false, error: 'Invalid music service URL' });
      return;
    }
    openPlaylistTab(msg.url);
    sendResponse({ ok: true });
    return;
  }

  if (msg.type === 'SPOTIFY_DISCONNECT') {
    _api.storage.local.remove(
      ['edj_spotify_access', 'edj_spotify_refresh', 'edj_spotify_expires', 'edj_spotifyConnected'],
      () => sendResponse({ ok: true })
    );
    return true;
  }
});

// ── LIFECYCLE ─────────────────────────────────────────────────────────────
_api.runtime.onInstalled.addListener(() => reInjectAll());
_api.runtime.onStartup.addListener(() => reInjectAll());

// Keyboard shortcut → toggle widget in the active Verse tab
if (_api.commands) {
  _api.commands.onCommand.addListener(async command => {
    if (command !== 'toggle-panel') return;
    const { edj_verseUrl } = await new Promise(resolve =>
      _api.storage.local.get('edj_verseUrl', resolve)
    );
    if (!edj_verseUrl) return;
    const host = edj_verseUrl.replace(/^https?:\/\//, '').split('/')[0];
    const [tab] = await _api.tabs.query({ active: true, currentWindow: true, url: `https://${host}/*` });
    if (tab) {
      _api.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.__hdjToggle?.()
      });
    }
  });
}
