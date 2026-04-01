/* Huddo DJ for HCL Verse — background.js (service worker) */
'use strict';

const _api = typeof browser !== 'undefined' ? browser : chrome;

// ── URL LAUNCH (Spotify / Apple Music / YouTube Music) ────────────────────
function openPlaylistTab(url) {
  return _api.tabs.create({ url, active: true });
}

// ── EMBED MINI-PLAYER ─────────────────────────────────────────────────────
let embedWindowId = null;

_api.windows.onRemoved.addListener(id => {
  if (id === embedWindowId) embedWindowId = null;
});

async function openEmbedWindow(embedUrl) {
  if (embedWindowId !== null) {
    try { await _api.windows.remove(embedWindowId); } catch (_) {}
    embedWindowId = null;
  }
  const win = await _api.windows.create({
    url: embedUrl,
    type: 'popup',
    width: 400,
    height: 200,
    focused: false
  });
  embedWindowId = win.id;
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
  if (msg.type === 'EMBED_PLAY') {
    if (!msg.url || !/^https:\/\/(open\.spotify\.com\/embed|embed\.music\.apple\.com|www\.youtube\.com\/embed)\//.test(msg.url)) {
      sendResponse({ ok: false, error: 'Invalid embed URL' });
      return;
    }
    openEmbedWindow(msg.url).then(() => sendResponse({ ok: true })).catch(e => sendResponse({ ok: false, error: e.message }));
    return true; // async response
  }

  if (msg.type === 'URL_PLAY') {
    if (!msg.url || !/^https:\/\/(music\.apple\.com|music\.youtube\.com|open\.spotify\.com)\//.test(msg.url)) {
      sendResponse({ ok: false, error: 'Invalid music service URL' });
      return;
    }
    openPlaylistTab(msg.url);
    sendResponse({ ok: true });
    return;
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
