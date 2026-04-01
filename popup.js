/* Huddo DJ for HCL Verse — popup.js */
'use strict';

const _api = typeof browser !== 'undefined' ? browser : chrome;

// ── DJ METADATA (display only — logic lives in content.js) ────────────────

const DJS = [
  { id: 'retro',  emoji: '🕺', name: 'DJ Spinmaster',   tag: 'Vinyl crate energy, disco soul' },
  { id: 'rock',   emoji: '🤘', name: 'DJ Thunderstrike', tag: "High drama — everything's a guitar solo" },
  { id: 'reggae', emoji: '🌴', name: 'DJ One Love',      tag: "Nothing's that urgent — ride the wave" },
  { id: 'jazz',   emoji: '🎷', name: 'DJ Coltrane',      tag: 'Sophisticated — reads the inbox like a chord chart' },
  { id: 'lofi',       emoji: '☕', name: 'dj study',    tag: 'minimal. lowercase. rain and coffee vibes.' },
  { id: 'hiphop',    emoji: '🎤', name: 'MC Overload',  tag: "Every email's a bar. Inbox is the stage." },
  { id: 'electronic',emoji: '🎛️', name: 'DJ Circuit',   tag: 'Inbox synced to the BPM. Stay in the grid.' },
  { id: 'classical', emoji: '🎼', name: 'DJ Maestro',   tag: 'The inbox is your symphony — conduct accordingly.' }
];

// ── DJ DEFAULT PLAYLISTS (mirrors content.js DJS[id].playlists) ──────────

const DJ_PLAYLISTS = {
  retro:  { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWULEW2RfoSCi', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWWvhKV4FBciw', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX4WgZiuR77Ef', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX1MUPbVKMgJE' },
  rock:   { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX6xOPeSOGone', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U', focused: 'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX1X7WV84927n', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWTcqUzwhNmKv' },
  reggae: { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX83I5je4W4rP', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DXbSbnqxMTGx9', focused: 'https://open.spotify.com/playlist/37i9dQZF1E4BF4A7UFAmeI', charged: 'https://open.spotify.com/playlist/37i9dQZF1DXan38dNVDdl4', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWW7BONj8RiqI' },
  jazz:   { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI', charged: 'https://open.spotify.com/playlist/37i9dQZF1EIeHZ9VTUfOrv', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX3rTk9UUrbYS' },
  lofi:       { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn', focused: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS', charged: 'https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP' },
  hiphop:     { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWVA1Gq4XHa6U', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWY6tYEFs22tT', charged: 'https://open.spotify.com/playlist/37i9dQZF1DWY4xHQp97fN6', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd' },
  electronic: { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n', focused: 'https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX8tZsk68tuDw', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675' },
  classical:  { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWVFeEut75IAL', focused: 'https://open.spotify.com/playlist/37i9dQZF1DXd5zUwdn6lPb', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX2aCk0vzzaZQ', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX9G9wwzwWL2k' }
};

const MOODS = [
  { id: 'zen',       label: 'Zen',       color: '#22c55e' },
  { id: 'flowing',   label: 'Flowing',   color: '#3b82f6' },
  { id: 'focused',   label: 'Focused',   color: '#f59e0b' },
  { id: 'charged',   label: 'Charged',   color: '#f97316' },
  { id: 'emergency', label: 'Emergency', color: '#ef4444' }
];

const URGENT_KEYWORDS_DEFAULT = [
  'urgent', 'asap', 'a.s.a.p', 'deadline', 'action required', 'immediate',
  'critical', 'emergency', 'overdue', 'eod', 'eow', 'today only',
  'time sensitive', 'time-sensitive', 'as soon as possible',
  'please respond', 'quick question', 'need your help now'
];

const DEFAULT_SCORING = {
  base:         50,
  urgentPer:     5,
  urgentMax:    20,
  flaggedPer:    5,
  flaggedMax:   10,
  arrivalMax:   15,
  vipMax:       30,
  timeWeekend: -15,
  timeFriLunch:-10,
  timeMonMorn:  10,
  timeMonMid:    5,
  timeAfter:    -5,
  tZen:         20,
  tFlowing:     40,
  tFocused:     60,
  tCharged:     80,
};

// ── MUSIC SERVICE DEFAULTS ────────────────────────────────────────────────

const DJ_PLAYLISTS_APPLEMUSIC = {
  retro: {
    zen:       'https://music.apple.com/us/playlist/quiet-storm-essentials/pl.de50676316b8498fb257847815cfcde9',
    flowing:   'https://music.apple.com/us/playlist/soulful-70s/pl.c1f19746fab040e29d609acf3582d9df',
    focused:   'https://music.apple.com/us/playlist/funk-essentials/pl.d3a816dac5504f4fa364ccab8ba40061',
    charged:   'https://music.apple.com/us/playlist/best-of-disco-hits/pl.dd3c0fce4ebd449387fb9273b182f2be',
    emergency: 'https://music.apple.com/us/playlist/disco-deep-cuts/pl.e9ffa7c33a824c7da1aa0e1362b89591'
  },
  rock: {
    zen:       'https://music.apple.com/us/playlist/rock-hits-unplugged/pl.5cd369ebc40b49d883b643c67d1e493d',
    flowing:   'https://music.apple.com/us/playlist/open-road-rockers-essentials/pl.38a5a6949d5645528d30be69210a6197',
    focused:   'https://music.apple.com/us/playlist/classic-rock-essentials/pl.1a7fd42205674dd282d106f533f4bea6',
    charged:   'https://music.apple.com/us/playlist/90s-hard-rock-essentials/pl.e6678ca6825344bb8b2599909b34e151',
    emergency: 'https://music.apple.com/us/playlist/extreme-metal/pl.1baada6675ca477cbe9946b3d21c5757'
  },
  reggae: {
    zen:       'https://music.apple.com/us/playlist/dub-essentials/pl.670df4df61b24072a35d436b4babe34b',
    flowing:   'https://music.apple.com/us/playlist/all-reggae/pl.70e5370006504b09bff1119a281119f0',
    focused:   'https://music.apple.com/us/playlist/roots-reggae-essentials/pl.feff5243ee0d4dac9a6797dcd1655e3b',
    charged:   'https://music.apple.com/us/playlist/dancehall-essentials/pl.6f6a3b3ea84140d2accad4e8cba793e4',
    emergency: 'https://music.apple.com/us/playlist/dancehall-party/pl.ff6b7bc129974cf78b7fd72c22caa46c'
  },
  jazz: {
    zen:       'https://music.apple.com/us/playlist/jazz-chill/pl.63271312c084419891982eab46cc68ac',
    flowing:   'https://music.apple.com/us/playlist/best-of-cool-jazz/pl.f1c48202b0a6428d9b12fbd540b4ae47',
    focused:   'https://music.apple.com/us/playlist/jazz-standards-essentials/pl.1df21488f86845b790c2bd751d2fcc4a',
    charged:   'https://music.apple.com/us/playlist/hard-bop-essentials/pl.b3f47883cff249eda4701069d8491fd1',
    emergency: 'https://music.apple.com/us/playlist/free-jazz-essentials/pl.eadc259e6ed34923a0fd20d92213ee69'
  },
  lofi: {
    zen:       'https://music.apple.com/us/playlist/ambient-chill/pl.bed492442a53481f98e98c6c4da9e01d',
    flowing:   'https://music.apple.com/us/playlist/lofi-girl-beats-to-relax-study-to/pl.bf7a3cbca49644d8a33f09c1285aef5c',
    focused:   'https://music.apple.com/us/playlist/lofi-hip-hop-beats-to-relax-code-study-and-focus/pl.e27dd96b0d73426fba75dffd2a7f3607',
    charged:   'https://music.apple.com/us/playlist/up-beat-lofi/pl.3c657a4ea4914945b6320e5f9aea2d77',
    emergency: 'https://music.apple.com/us/playlist/lo-fi-breeze/pl.7197f862319747fcbb944c7baec9c2b6'
  },
  hiphop: {
    zen:       'https://music.apple.com/us/playlist/late-night-hip-hop/pl.c15a5391c65e44759efc3083463f88c4',
    flowing:   'https://music.apple.com/us/playlist/hip-hop-throwback/pl.5cc74856fdab4a65a33f5bd706ba88da',
    focused:   'https://music.apple.com/us/playlist/conscious-hip-hop-essentials/pl.f1a08ab31a35420d81a4dd62d12bf58d',
    charged:   'https://music.apple.com/us/playlist/the-trap/pl.219740042a4947d68b05556e570dcb00',
    emergency: 'https://music.apple.com/us/playlist/hype-workout/pl.f305ae37fa9141598659571996aece09'
  },
  electronic: {
    zen:       'https://music.apple.com/us/playlist/ambient-essentials/pl.472dc0c5efe548bb9846e484378aa47b',
    flowing:   'https://music.apple.com/us/playlist/melodic-house-techno/pl.9642e1be452d43fca846dead91e6e8aa',
    focused:   'https://music.apple.com/us/playlist/deep-house-essentials/pl.b1f711892e794475ba644d1d2f21fe53',
    charged:   'https://music.apple.com/us/playlist/big-room-progressive-edm/pl.9f31633e78554bc0802774dd9821c244',
    emergency: 'https://music.apple.com/us/playlist/hard-dance-hard-trance-tech-hardstyle/pl.179d606b13034cdd9d7ca5a6841edd39'
  },
  classical: {
    zen:       'https://music.apple.com/us/playlist/relaxing-classical/pl.c2ab8af2e9e74576b3bb45d62819d5cd',
    flowing:   'https://music.apple.com/us/playlist/baroque-essentials/pl.4f94ca7ffe7d48538bd0e2606f1d3bbb',
    focused:   'https://music.apple.com/us/playlist/classical-concentration/pl.cf8514b686374fadbe6807a6339dfd89',
    charged:   'https://music.apple.com/us/playlist/classical-hits/pl.9dc583e20e344cc4bf7dc823abde7a2c',
    emergency: 'https://music.apple.com/us/playlist/epic-classical-music/pl.dc81f460b5fa49fda46c86489135aaff'
  }
};

const DJ_PLAYLISTS_YOUTUBEMUSIC = {
  retro: {
    zen:       '',
    flowing:   'https://music.youtube.com/playlist?list=RDCLAK5uy_nxZ3Bp0gO6_Wkb3bp9jESFoOz6bANXw4s',
    focused:   'https://music.youtube.com/playlist?list=RDCLAK5uy_kzJF5L0orSQpW0MBQyGjFlWVm2J_TmQPo',
    charged:   '',
    emergency: ''
  },
  rock: {
    zen:       'https://music.youtube.com/playlist?list=PLCD0445C57F2B7F41',
    flowing:   '',
    focused:   '',
    charged:   'https://music.youtube.com/playlist?list=PL3485902CC4FB6C67',
    emergency: ''
  },
  reggae:     { zen: '', flowing: '', focused: '', charged: '', emergency: '' },
  jazz: {
    zen:       '',
    flowing:   '',
    focused:   'https://music.youtube.com/playlist?list=RDCLAK5uy_kyZ7N5lM0kUpn7NbydMRujcq4aTEesP9I',
    charged:   '',
    emergency: ''
  },
  lofi: {
    zen:       'https://music.youtube.com/playlist?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM',
    flowing:   'https://music.youtube.com/playlist?list=RDCLAK5uy_lakC34Al6Kd5kidN8Bq0jpdnGUpIw2ctQ',
    focused:   '',
    charged:   '',
    emergency: ''
  },
  hiphop: {
    zen:       'https://music.youtube.com/playlist?list=RDCLAK5uy_kKEOZ3x5ED4hNxb8lHXhOp5cHFW_CbwMk',
    flowing:   '',
    focused:   'https://music.youtube.com/playlist?list=RDCLAK5uy_n7QjhERM2Q4Ha5B6t6ZmzyhOtRYjQtxKk',
    charged:   '',
    emergency: ''
  },
  electronic: {
    zen:       'https://music.youtube.com/playlist?list=RDCLAK5uy_mPolD_J22gS1SKxufARWcTZd1UrAH_0ZI',
    flowing:   'https://music.youtube.com/playlist?list=RDCLAK5uy_kBbljBMZ2exMXUc3MZdtXHsMwvGqf3eE8',
    focused:   '',
    charged:   '',
    emergency: ''
  },
  classical:  { zen: '', flowing: '', focused: '', charged: '', emergency: '' }
};

const SERVICE_DEFAULT_PLAYLISTS = {
  spotify:      DJ_PLAYLISTS,
  applemusic:   DJ_PLAYLISTS_APPLEMUSIC,
  youtubemusic: DJ_PLAYLISTS_YOUTUBEMUSIC
};

const SERVICE_HINTS = {
  spotify:      'Paste an open.spotify.com playlist URL (e.g. <em>https://open.spotify.com/playlist/…</em>) or leave blank for defaults.',
  applemusic:   'Paste an Apple Music playlist URL (e.g. <em>https://music.apple.com/…</em>) or leave blank for defaults.',
  youtubemusic: 'Paste a YouTube Music playlist URL (e.g. <em>https://music.youtube.com/playlist?list=…</em>) or leave blank for defaults.'
};

const SERVICE_PLACEHOLDERS = {
  spotify:      'https://open.spotify.com/playlist/…',
  applemusic:   'https://music.apple.com/…',
  youtubemusic: 'https://music.youtube.com/playlist?list=…'
};

function validatePlaylistValue(value, service) {
  if (!value) return true; // empty is always valid (uses default)
  if (service === 'spotify')      return /^https:\/\/open\.spotify\.com\/playlist\/[A-Za-z0-9]+$/.test(value);
  if (service === 'applemusic')   return /^https:\/\/music\.apple\.com\//.test(value);
  if (service === 'youtubemusic') return /^https:\/\/music\.youtube\.com\/playlist\?list=/.test(value);
  return true;
}

// ── STATE ──────────────────────────────────────────────────────────────────

let musicService = 'spotify';
let vipSenders = [];
let urgentKeywords = [...URGENT_KEYWORDS_DEFAULT];

let _savedPlaylists = {}; // nested { djId: { mood: uri } } — loaded from storage

// ── DOM REFS ───────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

// ── RENDER DJ GRID ─────────────────────────────────────────────────────────

function renderDJGrid(selectedId) {
  const grid = $('djGrid');
  grid.innerHTML = DJS.map(dj => `
    <label class="dj-card${dj.id === selectedId ? ' selected' : ''}" data-id="${dj.id}">
      <input type="radio" name="dj" value="${dj.id}"${dj.id === selectedId ? ' checked' : ''}>
      <span class="dj-emoji">${dj.emoji}</span>
      <span class="dj-info">
        <span class="dj-name">${dj.name}</span>
        <span class="dj-tag">${dj.tag}</span>
      </span>
    </label>
  `).join('');

  grid.addEventListener('change', () => {
    grid.querySelectorAll('.dj-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.id === getSelectedDJ());
    });
    // Re-render playlist inputs to show the newly selected DJ's defaults
    renderPlaylistInputs(getSelectedDJ(), _savedPlaylists);
    saveAll();
  });
}

function getSelectedDJ() {
  const checked = document.querySelector('input[name="dj"]:checked');
  return checked ? checked.value : 'lofi';
}

// ── RENDER PLAYLIST INPUTS ─────────────────────────────────────────────────

// djId: which DJ's defaults to show as placeholders
// allUserOverrides: the full nested { djId: { mood: uri } } object from storage
function renderPlaylistInputs(djId, allUserOverrides) {
  const dj = DJS.find(d => d.id === djId);
  const titleEl = $('playlistCardTitle');
  if (titleEl) titleEl.innerHTML = `${esc(dj ? dj.name : 'Custom')} Playlists <span style="font-weight:400;text-transform:none;color:#9ca3af">(optional)</span>`;
  const svcDefaults = (SERVICE_DEFAULT_PLAYLISTS[musicService] || DJ_PLAYLISTS)[djId] || {};
  const userForDJ   = (allUserOverrides || {})[djId] || {};
  const placeholder = SERVICE_PLACEHOLDERS[musicService] || 'https://open.spotify.com/playlist/…';
  $('playlistInputs').innerHTML = MOODS.map(m => `
    <div class="playlist-row">
      <span class="mood-dot" style="background:${m.color}"></span>
      <label for="pl_${m.id}">${m.label}</label>
      <input type="text" id="pl_${m.id}" placeholder="${esc(svcDefaults[m.id] || placeholder)}"
             value="${esc(userForDJ[m.id] || '')}" spellcheck="false" autocomplete="off">
    </div>
  `).join('');
  // Update the hint text
  const hintEl = $('playlistHint');
  if (hintEl) hintEl.innerHTML = SERVICE_HINTS[musicService] || SERVICE_HINTS.spotify;
}

// Returns only the non-empty user overrides for the currently selected DJ
function getPlaylistValues() {
  const out = {};
  MOODS.forEach(m => {
    const v = ($('pl_' + m.id)?.value || '').trim();
    if (v) out[m.id] = v;
  });
  return out;
}

// ── VIP SENDERS ────────────────────────────────────────────────────────────

function renderVIPs() {
  const list  = $('vipList');
  const empty = $('vipEmpty');
  if (!vipSenders.length) {
    list.innerHTML = '';
    list.appendChild(empty);
    return;
  }
  list.innerHTML = vipSenders.map((v, i) => `
    <span class="vip-chip">
      ${esc(v.email)}
      <span class="vip-rating" title="Mood score contribution">+${v.rating}</span>
      <button data-i="${i}" title="Remove" aria-label="Remove ${esc(v.email)}">✕</button>
    </span>
  `).join('');
  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      vipSenders.splice(parseInt(btn.dataset.i, 10), 1);
      renderVIPs();
      saveAll();
    });
  });
}

// ── SCORING INPUTS ──────────────────────────────────────────────────────────

function loadScoringInputs(sc) {
  const s = { ...DEFAULT_SCORING, ...sc };
  $('sc_base').value        = s.base;
  $('sc_urgentPer').value   = s.urgentPer;
  $('sc_urgentMax').value   = s.urgentMax;
  $('sc_flaggedPer').value  = s.flaggedPer;
  $('sc_flaggedMax').value  = s.flaggedMax;
  $('sc_arrivalMax').value  = s.arrivalMax;
  $('sc_vipMax').value      = s.vipMax;
  $('sc_timeWeekend').value = s.timeWeekend;
  $('sc_timeFriLunch').value= s.timeFriLunch;
  $('sc_timeMonMorn').value = s.timeMonMorn;
  $('sc_timeMonMid').value  = s.timeMonMid;
  $('sc_timeAfter').value   = s.timeAfter;
  $('sc_tZen').value        = s.tZen;
  $('sc_tFlowing').value    = s.tFlowing;
  $('sc_tFocused').value    = s.tFocused;
  $('sc_tCharged').value    = s.tCharged;
}

function getScoringFromInputs() {
  const n = (id, fallback) => { const v = parseInt($('sc_' + id)?.value, 10); return isNaN(v) ? fallback : v; };
  return {
    base:         n('base',         DEFAULT_SCORING.base),
    urgentPer:    n('urgentPer',    DEFAULT_SCORING.urgentPer),
    urgentMax:    n('urgentMax',    DEFAULT_SCORING.urgentMax),
    flaggedPer:   n('flaggedPer',   DEFAULT_SCORING.flaggedPer),
    flaggedMax:   n('flaggedMax',   DEFAULT_SCORING.flaggedMax),
    arrivalMax:   n('arrivalMax',   DEFAULT_SCORING.arrivalMax),
    vipMax:       n('vipMax',       DEFAULT_SCORING.vipMax),
    timeWeekend:  n('timeWeekend',  DEFAULT_SCORING.timeWeekend),
    timeFriLunch: n('timeFriLunch', DEFAULT_SCORING.timeFriLunch),
    timeMonMorn:  n('timeMonMorn',  DEFAULT_SCORING.timeMonMorn),
    timeMonMid:   n('timeMonMid',   DEFAULT_SCORING.timeMonMid),
    timeAfter:    n('timeAfter',    DEFAULT_SCORING.timeAfter),
    tZen:         n('tZen',         DEFAULT_SCORING.tZen),
    tFlowing:     n('tFlowing',     DEFAULT_SCORING.tFlowing),
    tFocused:     n('tFocused',     DEFAULT_SCORING.tFocused),
    tCharged:     n('tCharged',     DEFAULT_SCORING.tCharged),
  };
}

// ── URGENT KEYWORDS ────────────────────────────────────────────────────────

function renderKeywords() {
  const list = $('kwList');
  list.innerHTML = urgentKeywords.map((kw, i) => `
    <span class="kw-chip">
      ${esc(kw)}
      <button data-i="${i}" title="Remove" aria-label="Remove ${esc(kw)}">✕</button>
    </span>
  `).join('');
  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      urgentKeywords.splice(parseInt(btn.dataset.i, 10), 1);
      renderKeywords();
      saveAll();
    });
  });
}

$('btnAddKw').addEventListener('click', () => {
  const input = $('kwInput');
  const val   = input.value.trim().toLowerCase();
  if (!val || urgentKeywords.includes(val)) { input.focus(); return; }
  urgentKeywords.push(val);
  input.value = '';
  renderKeywords();
  saveAll();
  input.focus();
});

$('kwInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') $('btnAddKw').click();
});

$('btnResetKw').addEventListener('click', () => {
  urgentKeywords = [...URGENT_KEYWORDS_DEFAULT];
  renderKeywords();
  saveAll();
});

// ── AUTO-CHANGE TOGGLE ─────────────────────────────────────────────────────

// ── VIP INFO TOOLTIP ───────────────────────────────────────────────────────

$('vipInfoBtn').addEventListener('click', e => {
  e.stopPropagation();
  $('vipInfoWrap').classList.toggle('open');
});
document.addEventListener('click', () => $('vipInfoWrap').classList.remove('open'));

// ── VIP ADD ────────────────────────────────────────────────────────────────

$('btnAddVip').addEventListener('click', () => {
  const input  = $('vipInput');
  const rating = $('vipRating');
  const val    = input.value.trim();
  if (!val || vipSenders.some(v => v.email === val)) { input.focus(); return; }
  vipSenders.push({ email: val, rating: Math.min(30, Math.max(1, parseInt(rating.value, 10) || 5)) });
  input.value  = '';
  rating.value = '5';
  renderVIPs();
  saveAll();
  input.focus();
});

$('vipInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') $('btnAddVip').click();
});

// ── MUSIC SERVICE SELECTOR ─────────────────────────────────────────────────

function applyServiceUI(svc) {
  const radio = document.querySelector(`input[name="musicService"][value="${svc}"]`);
  if (radio) radio.checked = true;
}

document.querySelectorAll('input[name="musicService"]').forEach(radio => {
  radio.addEventListener('change', () => {
    musicService = radio.value;
    applyServiceUI(musicService);
    renderPlaylistInputs(getSelectedDJ(), _savedPlaylists);
    saveAll();
  });
});

// ── RESET BASELINE ─────────────────────────────────────────────────────────

$('btnReset').addEventListener('click', () => {
  _api.storage.local.remove('edj_baseline', () => {
    setStatus('Inbox baseline reset.', false);
  });
});

// ── AUTO-SAVE ──────────────────────────────────────────────────────────────

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function saveAll() {
  const rawUrl = ($('verseUrl').value || '').trim();
  if (!rawUrl) { setStatus('Enter your Verse URL to save.', true); return; }

  const djId      = getSelectedDJ();
  const playlists = getPlaylistValues();
  for (const [mood, uri] of Object.entries(playlists)) {
    if (!validatePlaylistValue(uri, musicService)) {
      const labels = { spotify: 'a https://open.spotify.com/playlist/… URL', applemusic: 'a https://music.apple.com/… URL', youtubemusic: 'a https://music.youtube.com/playlist?list=… URL' };
      setStatus(`Invalid value for ${mood} — expected ${labels[musicService] || 'a valid URL'}`, true);
      return;
    }
  }

  const verseUrl         = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const updatedPlaylists = Object.assign({}, _savedPlaylists, { [djId]: playlists });
  _savedPlaylists        = updatedPlaylists;

  _api.storage.local.set({
    edj_verseUrl:        verseUrl,
    edj_dj:              djId,
    edj_playlists:       updatedPlaylists,
    edj_musicService:    musicService,
    edj_vipSenders:      vipSenders,
    edj_autoChange:      $('autoChange').checked,
    edj_scoring:         getScoringFromInputs(),
    edj_urgentKeywords:  urgentKeywords,
    edj_language:        $('edj_language').value
  }, () => {
    setStatus('Saved', false);
    setTimeout(() => setStatus(''), 2000);
  });
}

const debouncedSave = debounce(saveAll, 800);

// Attach auto-save listeners
$('verseUrl').addEventListener('input', debouncedSave);
$('autoChange').addEventListener('change', saveAll);
$('edj_language').addEventListener('change', saveAll);
// Playlist inputs are re-rendered dynamically — use delegation
$('playlistInputs').addEventListener('input', debouncedSave);

// ── LOAD ───────────────────────────────────────────────────────────────────

_api.storage.local.get(
  ['edj_verseUrl', 'edj_dj', 'edj_playlists', 'edj_musicService', 'edj_vipSenders', 'edj_autoChange', 'edj_scoring', 'edj_urgentKeywords', 'edj_language'],
  r => {
    $('verseUrl').value = r.edj_verseUrl || '';
    if (!r.edj_verseUrl) inheritVerseUrl($('verseUrl'));

    musicService = r.edj_musicService || 'spotify';
    applyServiceUI(musicService);

    const selectedDJ = r.edj_dj || 'lofi';
    _savedPlaylists  = r.edj_playlists || {};
    renderDJGrid(selectedDJ);
    renderPlaylistInputs(selectedDJ, _savedPlaylists);

    $('autoChange').checked = r.edj_autoChange || false;

    vipSenders     = r.edj_vipSenders || [];
    urgentKeywords = r.edj_urgentKeywords || [...URGENT_KEYWORDS_DEFAULT];
    renderVIPs();
    renderKeywords();
    loadScoringInputs(r.edj_scoring || {});
    if (r.edj_language !== undefined) $('edj_language').value = r.edj_language;
  }
);

// Scoring inputs — save on change (number inputs fire 'change' on blur/enter)
['sc_base','sc_urgentPer','sc_urgentMax','sc_flaggedPer','sc_flaggedMax',
 'sc_arrivalMax','sc_vipMax','sc_timeWeekend','sc_timeFriLunch',
 'sc_timeMonMorn','sc_timeMonMid','sc_timeAfter',
 'sc_tZen','sc_tFlowing','sc_tFocused','sc_tCharged'
].forEach(id => $(id).addEventListener('change', debouncedSave));

$('btnResetScoring').addEventListener('click', () => {
  loadScoringInputs({});
  saveAll();
});

// ── PLAYLIST EXPORT / IMPORT ───────────────────────────────────────────────

$('btnExportPlaylists').addEventListener('click', () => {
  // Save current DJ's inputs into _savedPlaylists before exporting
  const djId = getSelectedDJ();
  const current = getPlaylistValues();
  const allPlaylists = Object.assign({}, _savedPlaylists, { [djId]: current });
  // Remove DJs with no custom entries
  for (const key of Object.keys(allPlaylists)) {
    if (!Object.keys(allPlaylists[key]).length) delete allPlaylists[key];
  }

  const payload = JSON.stringify({ version: 2, service: musicService, playlists: allPlaylists }, null, 2);
  const blob    = new Blob([payload], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = 'huddo-email-dj-playlists.json';
  a.click();
  URL.revokeObjectURL(url);
  setStatus('Playlists exported.', false);
  setTimeout(() => setStatus(''), 2000);
});

$('btnImportPlaylists').addEventListener('click', () => {
  $('importFileInput').click();
});

$('importFileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const data = JSON.parse(evt.target.result);
      if (!data.playlists || typeof data.playlists !== 'object') {
        throw new Error('Invalid file format');
      }
      const importedService = data.service || 'spotify'; // v1 files had no service field
      // Validate each value against the imported service's format
      for (const [djId, moods] of Object.entries(data.playlists)) {
        for (const [mood, uri] of Object.entries(moods)) {
          if (uri && !validatePlaylistValue(uri, importedService)) {
            throw new Error(`Invalid URL for ${djId}/${mood}: ${uri}`);
          }
        }
      }
      _savedPlaylists = data.playlists;
      musicService    = importedService;
      applyServiceUI(musicService);
      const djId = getSelectedDJ();
      renderPlaylistInputs(djId, _savedPlaylists);
      _api.storage.local.set({ edj_playlists: _savedPlaylists, edj_musicService: musicService }, () => {
        setStatus('Playlists imported.', false);
        setTimeout(() => setStatus(''), 2000);
      });
    } catch (err) {
      setStatus('Import failed: ' + err.message, true);
    }
    // Reset so the same file can be re-imported if needed
    e.target.value = '';
  };
  reader.readAsText(file);
});

// ── MOOD STATUS ────────────────────────────────────────────────────────────

const MOOD_COLORS_POPUP = {
  zen: '#22c55e', flowing: '#3b82f6', focused: '#f59e0b',
  charged: '#f97316', emergency: '#ef4444'
};
const POLL_INTERVAL_MS = 2 * 60 * 1000;

function initMoodStatus() {
  _api.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;
    _api.tabs.sendMessage(tab.id, { type: 'GET_MOOD_STATUS' }, res => {
      if (_api.runtime.lastError || !res) return; // not on Verse
      const chip      = $('moodStatusChip');
      const countdown = $('moodCountdown');
      if (res.mood) {
        chip.textContent = res.mood.charAt(0).toUpperCase() + res.mood.slice(1);
        chip.style.background = MOOD_COLORS_POPUP[res.mood] || '#d1d5db';
      }
      if (res.lastCheck) {
        let timer;
        const tick = () => {
          const remaining = Math.max(0, POLL_INTERVAL_MS - (Date.now() - res.lastCheck));
          const m = Math.floor(remaining / 60000);
          const s = Math.floor((remaining % 60000) / 1000);
          countdown.textContent = `${m}:${String(s).padStart(2, '0')}`;
          if (remaining === 0) clearInterval(timer);
        };
        tick();
        timer = setInterval(tick, 1000);
      }
    });
  });
}

initMoodStatus();

// ── HELPERS ────────────────────────────────────────────────────────────────

function inheritVerseUrl(inputEl) {
  _api.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;
    _api.tabs.sendMessage(tab.id, { type: 'GET_SHARED_VERSE_URL' }, res => {
      if (_api.runtime.lastError) return; // content script not ready
      if (res?.url && !inputEl.value) inputEl.value = res.url;
    });
  });
}

function setStatus(msg, isError) {
  const el = $('saveStatus');
  el.textContent = msg || '';
  el.className   = 'save-status' + (isError ? ' err' : msg ? ' ok' : '');
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── TOOLTIP POSITIONING ────────────────────────────────────────────────────
// Tooltips are 230px wide but the info buttons can sit anywhere in the popup.
// Calculate a clamped left offset for each tooltip so it always stays within
// the popup bounds (8px margin either side).

(function positionTooltips() {
  const TIP_W   = 230;
  const MARGIN  = 8;
  const popupW  = document.documentElement.offsetWidth;

  document.querySelectorAll('.info-wrap').forEach(wrap => {
    const tip = wrap.querySelector('.info-tip');
    if (!tip) return;

    const { left: wL, width: wW } = wrap.getBoundingClientRect();
    // Ideal: centre the tooltip on the button
    const ideal   = wW / 2 - TIP_W / 2;
    // Clamp so neither edge escapes the popup
    const minLeft = MARGIN - wL;
    const maxLeft = popupW - MARGIN - TIP_W - wL;
    const clamped = Math.max(minLeft, Math.min(maxLeft, ideal));

    tip.style.setProperty('--tip-left', Math.round(clamped) + 'px');
    // Arrow points at centre of button regardless of tooltip shift
    const arrowLeft = wW / 2 - clamped;
    tip.style.setProperty('--tip-arrow', Math.round(arrowLeft) + 'px');
  });
})();
