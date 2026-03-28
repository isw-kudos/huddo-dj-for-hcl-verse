/* Huddo DJ for HCL Verse — content.js */
'use strict';

if (window.__hdjLoaded) {
  // Already injected — nothing to do
} else {
  window.__hdjLoaded = true;

  const _api = typeof browser !== 'undefined' ? browser : chrome;

  // ── MOOD LEVELS & SCORING ──────────────────────────────────────────────

  const MOOD_THRESHOLDS = [20, 40, 60, 80]; // boundaries between zen/flowing/focused/charged/emergency

  const URGENT_KEYWORDS = [
    'urgent', 'asap', 'a.s.a.p', 'deadline', 'action required', 'immediate',
    'critical', 'emergency', 'overdue', 'eod', 'eow', 'today only',
    'time sensitive', 'time-sensitive', 'as soon as possible',
    'please respond', 'quick question', 'need your help now'
  ];

  // ── VERSE DOM SELECTORS ────────────────────────────────────────────────

  const SEL = {
    shell:       '.lotusShell, #lsMainFrame, .verse-app, .pim-mailread-container, .socpimComposeView',
    emailList:   '.lotusFrameRight, .pimMailList, .socpimMailList, [class*="maillist"]',
    unreadItems: '.pim-unread, .lotusUnread, [class*="pimunread"], [class*="unread-item"]',
    unreadBadge: '.pimInboxCount, .lotusUnreadCount, [class*="inbox-count"], [class*="unreadcount"]',
    subjectLines:'.pimMailSubject, .lotusSubject, [class*="subject"]',
    flagged:     '.pimFlagged, .lotusFlagged, [class*="flagged"], .pimHighImportance, [aria-label*="High importance"], [class*="importance-high"]',
    senders:     '.pimMailFrom, .lotusSenderName, [class*="mailfrom"], [socpimnameemail]'
  };

  // ── DEFAULT PLAYLISTS ──────────────────────────────────────────────────
  // Spotify's own curated playlists — users can override any of these in settings

  const DEFAULT_PLAYLISTS = {
    zen:       'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
    flowing:   'spotify:playlist:37i9dQZF1DXdeuECEhM6lW', // Chill Hits
    focused:   'spotify:playlist:37i9dQZF1DWZeKCadgRdKQ', // Deep Focus
    charged:   'spotify:playlist:37i9dQZF1DXdPec7aLTmlC', // Mood Booster
    emergency: 'spotify:playlist:37i9dQZF1DX76Wlfdnj7AP'  // Beast Mode
  };

  // ── DJ PERSONALITIES ───────────────────────────────────────────────────

  const DJS = {
    retro: {
      name: 'DJ Spinmaster', emoji: '🕺', tagline: 'Vinyl crate energy, disco soul',
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DWTx0xog3gN3q', // Uplifting Soul Classics
        flowing:   'spotify:playlist:37i9dQZF1DWULEW2RfoSCi', // 70s Soul Classics
        focused:   'spotify:playlist:37i9dQZF1DWWvhKV4FBciw', // Funk & Soul Classics
        charged:   'spotify:playlist:37i9dQZF1DX4WgZiuR77Ef', // All Funked Up
        emergency: 'spotify:playlist:37i9dQZF1DX1MUPbVKMgJE', // Disco Forever
      },
      zen:       { quote: "Smooth like Sunday morning on the dance floor. The inbox is groovin'.", playBtn: 'Drop the Needle ♫', passBtn: 'Flip Side' },
      flowing:   { quote: "Nice rhythm going here — like a perfect B-side that never quit.",         playBtn: 'Drop the Needle ♫', passBtn: 'Flip Side' },
      focused:   { quote: "It's heating up. Time for something with a little more drive on the platter.", playBtn: 'Drop the Needle ♫', passBtn: 'Flip Side' },
      charged:   { quote: "Inbox energy at Studio 54 levels. The crowd is going WILD, dig?",         playBtn: 'Drop the Needle ♫', passBtn: 'Flip Side' },
      emergency: { quote: "EVERYBODY ON THE FLOOR. This inbox is a FULL DISCO INFERNO right now!",   playBtn: 'Drop the Needle ♫', passBtn: 'Flip Side' }
    },
    rock: {
      name: 'DJ Thunderstrike', emoji: '🤘', tagline: "High drama — everything's a guitar solo",
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DX6xOPeSOGone', // Soft Rock
        flowing:   'spotify:playlist:37i9dQZF1DWXRqgorJj26U', // Rock Classics
        focused:   'spotify:playlist:37i9dQZF1DXdOEFt9ZX0dh', // Classic Rock Drive
        charged:   'spotify:playlist:37i9dQZF1DX1X7WV84927n', // Hard Rock
        emergency: 'spotify:playlist:37i9dQZF1DWTcqUzwhNmKv', // Kickass Metal
      },
      zen:       { quote: "The inbox sleeps... like a legend between world tours. Savour it.",        playBtn: 'Crank It Up 🔊', passBtn: 'Wrong Set' },
      flowing:   { quote: "A steady beat building. The set is warming up. Don't let it fool you.",    playBtn: 'Crank It Up 🔊', passBtn: 'Wrong Set' },
      focused:   { quote: "Feel that riff? Emails are hitting and you need to keep up.",              playBtn: 'Crank It Up 🔊', passBtn: 'Wrong Set' },
      charged:   { quote: "THIS IS A MOSHPIT IN YOUR INBOX. Emails flying everywhere. STAY WITH IT.", playBtn: 'Crank It Up 🔊', passBtn: 'Wrong Set' },
      emergency: { quote: "🔥 THE STAGE IS ON FIRE 🔥 Your inbox is a sold-out arena in CHAOS.",    playBtn: 'Crank It Up 🔊', passBtn: 'Wrong Set' }
    },
    reggae: {
      name: 'DJ One Love', emoji: '🌴', tagline: "Nothing's that urgent — ride the wave",
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DX83I5je4W4rP', // Beach Vibes
        flowing:   'spotify:playlist:37i9dQZF1DXbSbnqxMTGx9', // Reggae Classics
        focused:   'spotify:playlist:37i9dQZF1E4BF4A7UFAmeI', // Roots Reggae Radio
        charged:   'spotify:playlist:37i9dQZF1DXan38dNVDdl4', // Dancehall Official
        emergency: 'spotify:playlist:37i9dQZF1DWW7BONj8RiqI', // Massive Soca Hits
      },
      zen:       { quote: "Every little ting gonna be alright. Inbox quiet like the beach at dawn.",                     playBtn: 'Ride the Wave 🌊', passBtn: 'Not the Vibe' },
      flowing:   { quote: "Emails coming in nice and steady. Like the tide, ya know? No rush.",                          playBtn: 'Ride the Wave 🌊', passBtn: 'Not the Vibe' },
      focused:   { quote: "Getting a likkle busy now. Stay irie, keep the rhythm, don't stress.",                        playBtn: 'Ride the Wave 🌊', passBtn: 'Not the Vibe' },
      charged:   { quote: "Whoa now, nuff emails coming through. Still — breathe easy, inbox can wait for the sun.",     playBtn: 'Ride the Wave 🌊', passBtn: 'Not the Vibe' },
      emergency: { quote: "Okay dis inbox is A LOT right now. Still — one step, one love, one breath.",                 playBtn: 'Ride the Wave 🌊', passBtn: 'Not the Vibe' }
    },
    jazz: {
      name: 'DJ Coltrane', emoji: '🎷', tagline: 'Sophisticated — reads the inbox like a chord chart',
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
        flowing:   'spotify:playlist:37i9dQZF1DWVqfgj8NZEp1', // Coffee Table Jazz
        focused:   'spotify:playlist:37i9dQZF1DWV7EzJMK2FUI', // Jazz in the Background
        charged:   'spotify:playlist:37i9dQZF1EIeHZ9VTUfOrv', // Bebop Jazz Piano Mix
        emergency: 'spotify:playlist:37i9dQZF1DX3rTk9UUrbYS', // Avant-Jazz
      },
      zen:       { quote: "A minor seventh in a quiet room. Your inbox is resting on the one.",                           playBtn: 'Take Five ♩', passBtn: 'Wrong Key' },
      flowing:   { quote: "A steady walking bass. Correspondence moves through its changes nicely.",                      playBtn: 'Take Five ♩', passBtn: 'Wrong Key' },
      focused:   { quote: "The tempo has lifted — we're in the bridge now. Crisp, attentive, purposeful.",               playBtn: 'Take Five ♩', passBtn: 'Wrong Key' },
      charged:   { quote: "An unexpected modulation. The inbox has gone off-script and demands full attention.",          playBtn: 'Take Five ♩', passBtn: 'Wrong Key' },
      emergency: { quote: "Free jazz. Every voice playing at once. Your inbox is an avant-garde composition.",           playBtn: 'Take Five ♩', passBtn: 'Wrong Key' }
    },
    lofi: {
      name: 'dj study', emoji: '☕', tagline: 'minimal. lowercase. rain and coffee vibes.',
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DWZeKCadgRdKQ', // Deep Focus
        flowing:   'spotify:playlist:37i9dQZF1DWWQRwui0ExPn', // lofi beats
        focused:   'spotify:playlist:37i9dQZF1DX8Uebhn9wzrS', // chill lofi study beats
        charged:   'spotify:playlist:37i9dQZF1DWXLeA8Omikj7', // Brain Food
        emergency: 'spotify:playlist:37i9dQZF1DX76Wlfdnj7AP', // Beast Mode
      },
      zen:       { quote: 'inbox: quiet. a soft rain. you have time.',                           playBtn: 'play something', passBtn: 'nah' },
      flowing:   { quote: 'emails trickling in. manageable. kind of nice, actually.',            playBtn: 'play something', passBtn: 'nah' },
      focused:   { quote: "it's getting busier. put something good on. you've got this.",        playBtn: 'play something', passBtn: 'nah' },
      charged:   { quote: 'okay. inbox is a lot right now. put something steady on. breathe.',   playBtn: 'play something', passBtn: 'nah' },
      emergency: { quote: "... yeah that's a lot of emails. music might help. just saying.",     playBtn: 'play something', passBtn: 'nah' }
    },
    hiphop: {
      name: 'MC Overload', emoji: '🎤', tagline: "Every email's a bar. Inbox is the stage.",
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DWVA1Gq4XHa6U', // Gold School
        flowing:   'spotify:playlist:37i9dQZF1DX6GwdWRQMQpq', // Feelin' Myself
        focused:   'spotify:playlist:37i9dQZF1DWY6tYEFs22tT', // Hip-Hop Central
        charged:   'spotify:playlist:37i9dQZF1DWY4xHQp97fN6', // Get Turnt
        emergency: 'spotify:playlist:37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
      },
      zen:       { quote: "Inbox clean. Ice cold. Bars on standby.",                                      playBtn: 'Drop a Beat 🎤', passBtn: 'Skip the Track' },
      flowing:   { quote: "Emails sliding in smooth. Flow state locked. Keep the 16 going.",              playBtn: 'Drop a Beat 🎤', passBtn: 'Skip the Track' },
      focused:   { quote: "It's picking up. Lock in. Every email's a verse — don't miss a bar.",          playBtn: 'Drop a Beat 🎤', passBtn: 'Skip the Track' },
      charged:   { quote: "INBOX GOING CRAZY. This is the drop. Stay on the mic, don't choke.",           playBtn: 'Drop a Beat 🎤', passBtn: 'Skip the Track' },
      emergency: { quote: "🔥 HARDEST INBOX IN THE GAME RIGHT NOW 🔥 Every sender wildin'. This is it.", playBtn: 'Drop a Beat 🎤', passBtn: 'Skip the Track' }
    },
    electronic: {
      name: 'DJ Circuit', emoji: '🎛️', tagline: 'Inbox synced to the BPM. Stay in the grid.',
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DX3Ogo9pFvBkY', // Ambient Relaxation
        flowing:   'spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n', // mint
        focused:   'spotify:playlist:37i9dQZF1DX32NsLKyzScr', // Power Hour
        charged:   'spotify:playlist:37i9dQZF1DX8tZsk68tuDw', // Dance Rising
        emergency: 'spotify:playlist:37i9dQZF1DX6J5NfMJS675', // Techno Bunker
      },
      zen:       { quote: "Signal low. BPM at rest. Breathe in sync with the grid.",                      playBtn: 'Plug In 🎛️', passBtn: 'Kill the Signal' },
      flowing:   { quote: "Data packets arriving steady. Rhythms locked. System nominal.",                 playBtn: 'Plug In 🎛️', passBtn: 'Kill the Signal' },
      focused:   { quote: "Processing load climbing. Tempo rising. Neural sync engaged — don't drop out.", playBtn: 'Plug In 🎛️', passBtn: 'Kill the Signal' },
      charged:   { quote: "OVERLOAD IMMINENT. Bass is dropping. All circuits firing. Full system go.",     playBtn: 'Plug In 🎛️', passBtn: 'Kill the Signal' },
      emergency: { quote: "⚡ SYSTEM MAXED ⚡ Every circuit at redline. This is the drop. HOLD ON.",      playBtn: 'Plug In 🎛️', passBtn: 'Kill the Signal' }
    },
    classical: {
      name: 'DJ Maestro', emoji: '🎼', tagline: 'The inbox is your symphony — conduct accordingly.',
      playlists: {
        zen:       'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
        flowing:   'spotify:playlist:37i9dQZF1DWVFeEut75IAL', // Calming Classical
        focused:   'spotify:playlist:37i9dQZF1DXd5zUwdn6lPb', // Classical Focus
        charged:   'spotify:playlist:37i9dQZF1DX2aCk0vzzaZQ', // Dramatic Classical
        emergency: 'spotify:playlist:37i9dQZF1DX9G9wwzwWL2k', // Epic Classical
      },
      zen:       { quote: "The hall is still. A single note hangs in the air. Savour the silence.",                    playBtn: 'Raise the Baton 🎼', passBtn: 'Rest Bar' },
      flowing:   { quote: "A gentle andante. The inbox moves with purpose and grace — follow the phrase.",             playBtn: 'Raise the Baton 🎼', passBtn: 'Rest Bar' },
      focused:   { quote: "The tempo quickens — allegro. Keep your eyes on the score. Don't lose the bar.",           playBtn: 'Raise the Baton 🎼', passBtn: 'Rest Bar' },
      charged:   { quote: "Fortissimo! The full orchestra is calling. Your inbox demands total command.",              playBtn: 'Raise the Baton 🎼', passBtn: 'Rest Bar' },
      emergency: { quote: "🎻 THE CRESCENDO IS HERE 🎻 Every instrument at full power. This is the finale. CONDUCT.", playBtn: 'Raise the Baton 🎼', passBtn: 'Rest Bar' }
    }
  };

  const MOOD_COLORS = {
    zen:       '#22c55e',
    flowing:   '#3b82f6',
    focused:   '#f59e0b',
    charged:   '#f97316',
    emergency: '#ef4444'
  };

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

  const MOOD_EMOJI = {
    zen: '😌', flowing: '🌊', focused: '🎯', charged: '⚡', emergency: '🚨'
  };

  // ── STATE ──────────────────────────────────────────────────────────────

  let settings = {
    verseUrl:         '',
    dj:               'lofi',
    playlists:        {},
    vipSenders:       [],
    spotifyConnected: false,
    musicService:     'spotify',
    autoChange:       false,
    scoring:          { ...DEFAULT_SCORING },
    urgentKeywords:   [...URGENT_KEYWORDS]
  };
  let baseline         = { avg: null, samples: 0 };
  let arrivalTimes     = [];   // timestamps of detected new emails (last 30 min)
  let currentMood           = null;
  let lastAcknowledgedMood  = null; // mood at time user last opened the panel
  let pollTimer             = null;
  let lastMoodCheckAt       = null;
  let initialized           = false;
  let pollingStarted        = false;

  // ── SETTINGS ──────────────────────────────────────────────────────────

  async function loadSettings() {
    return new Promise(resolve => {
      _api.storage.local.get(
        ['edj_verseUrl', 'edj_dj', 'edj_playlists', 'edj_vipSenders',
         'edj_baseline', 'edj_spotifyConnected', 'edj_musicService', 'edj_autoChange', 'edj_scoring', 'edj_urgentKeywords'],
        r => {
          settings.verseUrl         = r.edj_verseUrl || '';
          settings.dj               = r.edj_dj || 'lofi';
          settings.playlists        = r.edj_playlists || {};
          settings.vipSenders       = r.edj_vipSenders || [];
          settings.spotifyConnected = r.edj_spotifyConnected || false;
          settings.musicService     = r.edj_musicService || 'spotify';
          settings.autoChange       = r.edj_autoChange || false;
          settings.scoring          = r.edj_scoring ? { ...DEFAULT_SCORING, ...r.edj_scoring } : { ...DEFAULT_SCORING };
          settings.urgentKeywords   = r.edj_urgentKeywords || [...URGENT_KEYWORDS];
          if (r.edj_baseline) baseline = r.edj_baseline;
          resolve();
        }
      );
    });
  }

  function shouldActivate() {
    if (!settings.verseUrl) return false;
    const normalised     = settings.verseUrl.replace(/^https?:\/\//, '');
    const slashIdx       = normalised.indexOf('/');
    const configuredHost = slashIdx === -1 ? normalised : normalised.slice(0, slashIdx);
    const configuredPath = slashIdx === -1 ? '' : normalised.slice(slashIdx).replace(/\/$/, '');
    const hostMatches    = location.hostname === configuredHost || location.hostname.endsWith('.' + configuredHost);
    const pathMatches    = configuredPath === '' ||
                           location.pathname === configuredPath ||
                           location.pathname.startsWith(configuredPath + '/');
    return hostMatches && pathMatches;
  }

  // ── VERSE DOM SIGNAL READERS ───────────────────────────────────────────

  function getUnreadCount() {
    // Prefer the unread badge (fastest, most reliable)
    const badge = document.querySelector(SEL.unreadBadge);
    if (badge) {
      const n = parseInt(badge.textContent.replace(/\D/g, ''), 10);
      if (!isNaN(n) && n >= 0) return n;
    }
    return document.querySelectorAll(SEL.unreadItems).length;
  }

  function getUrgentSubjectCount() {
    const els = document.querySelectorAll(SEL.subjectLines);
    let count = 0;
    els.forEach(el => {
      const text = (el.textContent || '').toLowerCase();
      if (settings.urgentKeywords.some(kw => text.includes(kw))) count++;
    });
    return count;
  }

  function getFlaggedCount() {
    return document.querySelectorAll(SEL.flagged).length;
  }

  function getVIPHits() {
    if (!settings.vipSenders.length) return 0;
    const els = document.querySelectorAll(SEL.senders);
    let score = 0;
    els.forEach(el => {
      const text     = (el.textContent || '').toLowerCase();
      const title    = (el.getAttribute('title') || '').toLowerCase();
      const email    = (el.getAttribute('socpimnameemail') || el.getAttribute('email') || '').toLowerCase();
      const combined = text + ' ' + title + ' ' + email;
      settings.vipSenders.forEach(v => {
        const match  = typeof v === 'string' ? v : v.email; // backwards compat
        const rating = typeof v === 'string' ? 5 : (v.rating || 5);
        if (combined.includes(match.toLowerCase())) score += rating;
      });
    });
    return Math.min(score, settings.scoring.vipMax);
  }

  function getTimeModifier() {
    const now = new Date();
    const day = now.getDay();
    const h   = now.getHours();
    const s   = settings.scoring;

    if (day === 0 || day === 6)         return s.timeWeekend;  // weekend
    if (day === 5 && h >= 15)           return s.timeWeekend;  // Friday pm
    if (day === 5 && h >= 12)           return s.timeFriLunch; // Friday lunch
    if (day === 1 && h >= 8  && h < 10) return s.timeMonMorn;  // Monday morning
    if (day === 1 && h >= 10 && h < 12) return s.timeMonMid;   // Monday mid-morning
    if (h >= 18 || h < 8)               return s.timeAfter;    // outside office hours
    return 0;
  }

  // ── ARRIVAL RATE ───────────────────────────────────────────────────────

  const ARRIVAL_WINDOW_MS = 30 * 60 * 1000;

  function recordArrival() {
    const now = Date.now();
    arrivalTimes.push(now);
    arrivalTimes = arrivalTimes.filter(t => now - t < ARRIVAL_WINDOW_MS);
  }

  function getArrivalRateScore() {
    const now    = Date.now();
    const recent = arrivalTimes.filter(t => now - t < ARRIVAL_WINDOW_MS).length;
    if (recent === 0) return 0;
    const max = settings.scoring.arrivalMax;
    if (recent <= 2)  return Math.round(max * 3  / 15);
    if (recent <= 5)  return Math.round(max * 7  / 15);
    if (recent <= 10) return Math.round(max * 11 / 15);
    return max;
  }

  // ── BASELINE MANAGEMENT ────────────────────────────────────────────────
  // Uses an exponential moving average so users who always have many unreads
  // don't get stuck in "Emergency" mode permanently.

  function updateBaseline(unread) {
    if (baseline.avg === null) {
      baseline.avg     = unread;
      baseline.samples = 1;
    } else {
      const alpha    = 0.05; // slow learning rate
      baseline.avg   = alpha * unread + (1 - alpha) * baseline.avg;
      baseline.samples++;
    }
    try { _api.storage.local.set({ edj_baseline: baseline }); } catch(e) {
      clearInterval(pollTimer); // extension context invalidated — stop polling
    }
  }

  function getUnreadDeltaScore(unread) {
    if (baseline.avg === null || baseline.samples < 5) return 0; // not enough data yet
    const ratio = unread / Math.max(baseline.avg, 1);
    if (ratio >= 2.0) return  20;
    if (ratio >= 1.5) return  10;
    if (ratio >= 1.1) return   5;
    if (ratio <= 0.5) return -20;
    if (ratio <= 0.75) return -10;
    return 0;
  }

  // ── MOOD CALCULATION ───────────────────────────────────────────────────

  function calculateMood() {
    // If the Huddo AI Assistant extension is present and has pre-computed signals,
    // defer to it for a richer analysis.
    const aiSignals = window.__hddAISignals;
    if (aiSignals && typeof aiSignals.moodScore === 'number') {
      return scoreToMood(Math.max(0, Math.min(100, aiSignals.moodScore)));
    }

    const unread = getUnreadCount();
    updateBaseline(unread);

    const sc = settings.scoring;
    let score = sc.base;
    score += getUnreadDeltaScore(unread);
    score += getArrivalRateScore();
    score += Math.min(sc.urgentMax,  getUrgentSubjectCount() * sc.urgentPer);
    score += Math.min(sc.flaggedMax, getFlaggedCount()       * sc.flaggedPer);
    score += getVIPHits();
    score += getTimeModifier();

    return scoreToMood(Math.max(0, Math.min(100, score)));
  }

  function scoreToMood(score) {
    const t = settings.scoring;
    if (score < t.tZen)     return 'zen';
    if (score < t.tFlowing) return 'flowing';
    if (score < t.tFocused) return 'focused';
    if (score < t.tCharged) return 'charged';
    return 'emergency';
  }

  // ── EXTENSION STACKING ─────────────────────────────────────────────────
  // Uses a DOM attribute as shared state so Huddo extensions coordinate
  // across Chrome's content-script isolated worlds (window is not shared).
  // Each button stamps data-huddo-ext-btn with its registration timestamp;
  // slot order is determined by sorting those timestamps ascending.

  const HUDDO_BTN_ATTR = 'data-huddo-ext-btn';
  const HUDDO_BASE_BTM = 90;  // px from bottom for slot 0
  const HUDDO_SLOT_SZ  = 56;  // px per slot (48px button + 8px gap)

  function getHuddoSlot(btnId) {
    const btns = Array.from(document.querySelectorAll(`[${HUDDO_BTN_ATTR}]`));
    btns.sort((a, b) => Number(a.getAttribute(HUDDO_BTN_ATTR)) - Number(b.getAttribute(HUDDO_BTN_ATTR)));
    const idx = btns.findIndex(b => b.id === btnId);
    return idx < 0 ? 0 : idx;
  }

  function applySlotPosition() {
    const btn = document.getElementById('hdj-toggle');
    if (!btn) return;
    const bottom = HUDDO_BASE_BTM + getHuddoSlot('hdj-toggle') * HUDDO_SLOT_SZ;
    btn.style.bottom = bottom + 'px';
    const panel = document.getElementById('hdj-panel');
    // Don't reposition if user has manually dragged the panel (left is set)
    if (panel && !panel.style.left) panel.style.bottom = (bottom + 48 + 12) + 'px';
  }

  function registerWithStack() {
    const btn = document.getElementById('hdj-toggle');
    if (btn) btn.setAttribute(HUDDO_BTN_ATTR, String(Date.now()));
    applySlotPosition();

    // Reposition whenever any Huddo button is added, removed, or stamped
    const obs = new MutationObserver(mutations => {
      const relevant = mutations.some(m =>
        m.type === 'attributes' ||
        Array.from(m.addedNodes).some(n => n.hasAttribute?.(HUDDO_BTN_ATTR)) ||
        Array.from(m.removedNodes).some(n => n.hasAttribute?.(HUDDO_BTN_ATTR))
      );
      if (relevant) applySlotPosition();
    });
    obs.observe(document.body, {
      subtree: true, childList: true,
      attributes: true, attributeFilter: [HUDDO_BTN_ATTR]
    });
  }

  // ── UTILITIES ──────────────────────────────────────────────────────────

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function savePanelPosition(panel) {
    const { left, top, width, height } = panel.style;
    try { _api.storage.local.set({ edj_pos: { left, top, width, height } }); } catch(e) {}
  }

  function restorePanelPosition(panel) {
    return new Promise(resolve => {
      _api.storage.local.get('edj_pos', r => {
        const pos = r.edj_pos;
        if (pos && pos.left) {
          panel.style.left   = pos.left;
          panel.style.top    = pos.top;
          panel.style.right  = 'auto';
          panel.style.bottom = 'auto';
          if (pos.width)  panel.style.width  = pos.width;
          if (pos.height) panel.style.height = pos.height;
        } else {
          const btns = Array.from(document.querySelectorAll('[data-huddo-ext-btn]'));
          const maxSlot = Math.max(0, btns.length - 1);
          panel.style.bottom = (90 + maxSlot * 56 + 48 + 10) + 'px';
          panel.style.right  = '7px';
          panel.style.top    = 'auto';
          panel.style.left   = 'auto';
        }
        resolve();
      });
    });
  }

  // ── TOGGLE BUTTON ──────────────────────────────────────────────────────

  function createToggleBtn() {
    // Remove any stale button left by a previous content script instance
    document.getElementById('hdj-toggle')?.remove();

    const btn = document.createElement('button');
    btn.id    = 'hdj-toggle';
    btn.title = 'Huddo DJ for HCL Verse (Alt+D)';
    // Headphone icon
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5v-2a7 7 0 1 1 14 0v2h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"/>
    </svg>`;
    btn.addEventListener('click', togglePanel);
    document.body.appendChild(btn);
    return btn;
  }

  function updateToggleColor(suggestedMood) {
    const btn = document.getElementById('hdj-toggle');
    if (!btn) return;
    // Background stays on the last acknowledged mood (falls back to suggested on first run)
    const bgMood = lastAcknowledgedMood || suggestedMood;
    btn.setAttribute('data-mood', bgMood);
    // Outer ring shows the new suggested mood only when it differs from acknowledged
    const ringColor = (suggestedMood && suggestedMood !== bgMood)
      ? MOOD_COLORS[suggestedMood]
      : 'transparent';
    btn.style.setProperty('--hdj-ring', ringColor);
  }

  // ── PANEL ──────────────────────────────────────────────────────────────

  function togglePanel() {
    if (document.getElementById('hdj-panel')) {
      closePanel();
    } else {
      openPanel(currentMood || 'focused');
    }
  }

  // Exposed for the keyboard shortcut from background.js
  window.__hdjToggle = togglePanel;

  function closePanel() {
    const panel = document.getElementById('hdj-panel');
    if (panel) { savePanelPosition(panel); panel.remove(); }
  }

  async function openPanel(mood) {
    closePanel();

    // User has acknowledged this mood — update background, clear ring and suggestion dot
    lastAcknowledgedMood = mood;
    const btn = document.getElementById('hdj-toggle');
    if (btn) {
      btn.setAttribute('data-mood', mood);
      btn.style.setProperty('--hdj-ring', 'transparent');
      btn.classList.remove('hdj-has-suggestion');
    }

    const dj       = DJS[settings.dj] || DJS.lofi;
    const moodData = dj[mood];
    const color    = MOOD_COLORS[mood];
    const moodLabel = mood.charAt(0).toUpperCase() + mood.slice(1);
    const djDefaults  = (DJS[settings.dj] || DJS.lofi).playlists || {};
    const userOverride = (settings.playlists[settings.dj] || {})[mood];
    const playlistUri = userOverride || djDefaults[mood] || DEFAULT_PLAYLISTS[mood];

    const panel = document.createElement('div');
    panel.id = 'hdj-panel';
    panel.setAttribute('data-mood', mood);

    const isSpotify = settings.musicService === 'spotify';
    const needsAuth = isSpotify && !settings.spotifyConnected;
    const actionsHtml = needsAuth
      ? `<div class="hdj-connect-cta">
           <p class="hdj-connect-hint">Connect Spotify to start the music</p>
           <button class="hdj-btn-connect">Connect Spotify</button>
         </div>`
      : playlistUri
        ? `<div class="hdj-actions">
             <button class="hdj-btn-play" data-uri="${esc(playlistUri)}">${esc(moodData.playBtn)}</button>
             <button class="hdj-btn-pass">${esc(moodData.passBtn)}</button>
           </div>`
        : `<div class="hdj-connect-cta">
             <p class="hdj-connect-hint">No playlist set for this mood — add one in settings</p>
           </div>`;

    const moodBarHtml = Object.entries(MOOD_COLORS).map(([m, c]) => `
      <button class="hdj-mood-btn${m === mood ? ' active' : ''}" data-mood="${esc(m)}"
              title="${esc(m.charAt(0).toUpperCase() + m.slice(1))}"
              style="background:${esc(c)}">${esc(MOOD_EMOJI[m])}</button>
    `).join('');

    const djBarHtml = Object.entries(DJS).map(([id, d]) => `
      <button class="hdj-dj-btn${id === settings.dj ? ' active' : ''}" data-dj="${esc(id)}"
              title="${esc(d.name)}" style="${id === settings.dj ? `border-color:${esc(color)}` : ''}">${esc(d.emoji)}</button>
    `).join('');

    panel.innerHTML = `
      <div class="hdj-header" style="background:${esc(color)}">
        <span class="hdj-dj-name">${esc(dj.emoji)} ${esc(dj.name)}</span>
        <button class="hdj-close" title="Close" aria-label="Close">✕</button>
      </div>
      <div class="hdj-dj-bar hdj-dj-bar--top">${djBarHtml}</div>
      <div class="hdj-mood-bar">${moodBarHtml}</div>
      <div class="hdj-body">
        <p class="hdj-quote"><span class="hdj-dj-byline">${esc(dj.name)}:</span> &ldquo;${esc(moodData.quote)}&rdquo;</p>
        ${actionsHtml}
        <p class="hdj-status" aria-live="polite"></p>
      </div>
      <div class="hdj-resizer n"  data-dir="n"></div>
      <div class="hdj-resizer s"  data-dir="s"></div>
      <div class="hdj-resizer e"  data-dir="e"></div>
      <div class="hdj-resizer w"  data-dir="w"></div>
      <div class="hdj-resizer nw" data-dir="nw"></div>
      <div class="hdj-resizer ne" data-dir="ne"></div>
      <div class="hdj-resizer sw" data-dir="sw"></div>
      <div class="hdj-resizer se" data-dir="se"></div>
    `;

    document.body.appendChild(panel);
    await restorePanelPosition(panel);
    makeDraggable(panel);
    makeResizable(panel);
    wirePanel(panel, mood, playlistUri);
  }

  function wirePanel(panel, mood, playlistUri) {
    panel.querySelector('.hdj-close').addEventListener('click', closePanel);

    // Mood selector — re-opens panel at chosen mood
    panel.querySelectorAll('.hdj-mood-btn').forEach(btn => {
      btn.addEventListener('click', () => openPanel(btn.dataset.mood));
    });

    // DJ selector — saves choice then re-renders
    panel.querySelectorAll('.hdj-dj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        settings.dj = btn.dataset.dj;
        _api.storage.local.set({ edj_dj: settings.dj });
        openPanel(mood);
      });
    });

    const playBtn = panel.querySelector('.hdj-btn-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const uri = playBtn.dataset.uri;
        setStatus(panel, '');
        playBtn.textContent = 'Starting…';
        playBtn.disabled    = true;

        const isSpotify = settings.musicService === 'spotify';
        const SERVICE_LABELS = { spotify: 'Spotify', applemusic: 'Apple Music', youtubemusic: 'YouTube Music' };
        const svcLabel = SERVICE_LABELS[settings.musicService] || 'music service';
        const msg = isSpotify
          ? { type: 'SPOTIFY_PLAY', uri }
          : { type: 'URL_PLAY', url: uri };
        _api.runtime.sendMessage(msg, res => {
          const dj = DJS[settings.dj] || DJS.lofi;
          if (res?.ok) {
            setStatus(panel, isSpotify ? '♫ Playing on Spotify' : `♫ Opening in ${svcLabel}`);
          } else {
            setStatus(panel, res?.error || `Could not open ${svcLabel} — please try again.`);
          }
          playBtn.textContent = dj[mood].playBtn;
          playBtn.disabled    = false;
        });
      });
    }

    const passBtn = panel.querySelector('.hdj-btn-pass');
    if (passBtn) {
      passBtn.addEventListener('click', closePanel);
    }

    const connectBtn = panel.querySelector('.hdj-btn-connect');
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        connectBtn.textContent = 'Connecting…';
        connectBtn.disabled    = true;
        _api.runtime.sendMessage({ type: 'SPOTIFY_AUTH' }, res => {
          if (res?.ok) {
            settings.spotifyConnected = true;
            openPanel(mood); // re-render with play button
          } else {
            setStatus(panel, res?.error || 'Connection failed — please try again.');
            connectBtn.textContent = 'Connect Spotify';
            connectBtn.disabled    = false;
          }
        });
      });
    }
  }

  function makeDraggable(panel) {
    const header = panel.querySelector('.hdj-header');
    if (!header) return;
    let dragging = false, startX, startY, startLeft, startTop;
    header.addEventListener('mousedown', e => {
      if (e.target.closest('.hdj-close')) return;
      dragging = true; startX = e.clientX; startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left; startTop = rect.top;
      panel.style.right = 'auto'; panel.style.bottom = 'auto';
      panel.style.left = startLeft + 'px'; panel.style.top = startTop + 'px';
      e.preventDefault();
    });
    const onMove = e => {
      if (!dragging) return;
      panel.style.left = Math.max(0, startLeft + (e.clientX - startX)) + 'px';
      panel.style.top  = Math.max(0, startTop  + (e.clientY - startY)) + 'px';
    };
    const onUp = () => { if (dragging) { dragging = false; savePanelPosition(panel); } };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function makeResizable(panel) {
    let resizing = false, dir = '', startX, startY, startW, startH, startLeft, startTop;
    panel.querySelectorAll('.hdj-resizer').forEach(h => {
      h.addEventListener('mousedown', e => {
        resizing = true; dir = h.dataset.dir;
        startX = e.clientX; startY = e.clientY;
        startW = panel.offsetWidth; startH = panel.offsetHeight;
        const rect = panel.getBoundingClientRect();
        startLeft = rect.left; startTop = rect.top;
        panel.style.right = 'auto'; panel.style.bottom = 'auto';
        panel.style.left = startLeft + 'px'; panel.style.top = startTop + 'px';
        e.preventDefault(); e.stopPropagation();
      });
    });
    const onMove = e => {
      if (!resizing) return;
      const dx = e.clientX - startX, dy = e.clientY - startY, minW = 280, minH = 200;
      if (dir.includes('e')) panel.style.width  = Math.max(minW, startW + dx) + 'px';
      if (dir.includes('w')) { const nW = Math.max(minW, startW - dx); panel.style.width = nW + 'px'; panel.style.left = (startLeft + startW - nW) + 'px'; }
      if (dir.includes('s')) panel.style.height = Math.max(minH, startH + dy) + 'px';
      if (dir.includes('n')) { const nH = Math.max(minH, startH - dy); panel.style.height = nH + 'px'; panel.style.top  = (startTop  + startH - nH) + 'px'; }
    };
    const onUp = () => { if (resizing) { resizing = false; savePanelPosition(panel); } };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function setStatus(panel, text) {
    const el = panel.querySelector('.hdj-status');
    if (el) el.textContent = text;
  }

  // ── POLLING LOOP ───────────────────────────────────────────────────────

  function runMoodCheck() {
    const mood = calculateMood();
    currentMood = mood;
    lastMoodCheckAt = Date.now();

    const isSpotify      = settings.musicService === 'spotify';
    const serviceReady   = isSpotify ? settings.spotifyConnected : true;
    if (settings.autoChange && serviceReady && mood !== lastAcknowledgedMood) {
      // Auto-switch playlist to match new mood
      const djDefaults   = (DJS[settings.dj] || DJS.lofi).playlists || {};
      const userOverride = (settings.playlists[settings.dj] || {})[mood];
      const uri          = userOverride || djDefaults[mood] || DEFAULT_PLAYLISTS[mood];
      if (!uri) return; // no playlist configured for this mood/service
      const msg = isSpotify ? { type: 'SPOTIFY_PLAY', uri } : { type: 'URL_PLAY', url: uri };
      _api.runtime.sendMessage(msg, res => {
        if (res?.ok) {
          // Acknowledge the new mood — update button, clear ring and dot
          lastAcknowledgedMood = mood;
          const btn = document.getElementById('hdj-toggle');
          if (btn) {
            btn.setAttribute('data-mood', mood);
            btn.style.setProperty('--hdj-ring', 'transparent');
            btn.classList.remove('hdj-has-suggestion');
          }
        }
      });
    } else {
      updateToggleColor(mood);
      // Show suggestion dot when mood has shifted since user last opened the panel
      const btn = document.getElementById('hdj-toggle');
      if (btn) btn.classList.toggle('hdj-has-suggestion', mood !== lastAcknowledgedMood);
    }
  }

  function startPolling() {
    runMoodCheck(); // immediate first pass
    pollTimer = setInterval(runMoodCheck, 2 * 60 * 1000);
  }

  // ── EMAIL ARRIVAL OBSERVER ─────────────────────────────────────────────
  // Watches the email list DOM for new nodes so we can track arrival rate.

  function watchEmailList() {
    const root = document.querySelector(SEL.emailList) || document.body;
    const obs  = new MutationObserver(mutations => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          const cls = (node.getAttribute('class') || '').toLowerCase();
          // Only count nodes that look like email rows
          if (cls.includes('mail') || cls.includes('message') || cls.includes('pim')) {
            recordArrival();
          }
        }
      }
    });
    obs.observe(root, { childList: true, subtree: true });
  }

  // ── INITIALISATION ─────────────────────────────────────────────────────

  async function init() {
    if (initialized) return;
    initialized = true; // set immediately to block any concurrent calls
    await loadSettings();
    if (!shouldActivate()) return;

    // Share the configured URL via page localStorage so other Huddo extensions
    // can inherit it if they haven't been configured yet.
    try { localStorage.setItem('__huddo_verse_url', settings.verseUrl); } catch(e) {}

    // Show the button immediately — it doesn't need the Verse shell to exist
    createToggleBtn();
    registerWithStack();

    // Defer email reading until the Verse shell is in the DOM
    function setupPolling() {
      if (pollingStarted) return;
      pollingStarted = true;
      watchEmailList();
      startPolling();
    }

    if (document.querySelector(SEL.shell)) {
      setupPolling();
    } else {
      const obs = new MutationObserver(() => {
        if (document.querySelector(SEL.shell)) {
          obs.disconnect();
          clearTimeout(fallbackTimer);
          setupPolling();
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
      // Fallback: if the shell selector never matches, start polling after 10s anyway.
      const fallbackTimer = setTimeout(() => {
        obs.disconnect();
        setupPolling();
      }, 10000);
    }

    // React to settings changes made in the popup (without page reload)
    _api.storage.onChanged.addListener(changes => {
      const keys = ['edj_verseUrl', 'edj_dj', 'edj_playlists', 'edj_vipSenders', 'edj_spotifyConnected', 'edj_musicService', 'edj_autoChange', 'edj_scoring', 'edj_urgentKeywords'];
      if (keys.some(k => k in changes)) loadSettings();
    });
  }

  // Allow the popup to retrieve the shared Verse URL written by any Huddo extension
  _api.runtime.onMessage.addListener((msg, _sender, respond) => {
    if (msg.type === 'GET_SHARED_VERSE_URL') {
      try { respond({ url: localStorage.getItem('__huddo_verse_url') || '' }); }
      catch(e) { respond({ url: '' }); }
      return true;
    }
    if (msg.type === 'GET_MOOD_STATUS') {
      respond({ mood: currentMood, lastCheck: lastMoodCheckAt });
      return true;
    }
  });

  // ── DEBUG HELPERS (browser console) ───────────────────────────────────
  // __hdjDebug()        — log all signal values and current score breakdown
  // __hdjSetMood(mood)  — force a mood ('zen','flowing','focused','charged','emergency')

  window.__hdjDebug = function() {
    const unread   = getUnreadCount();
    const urgent   = getUrgentSubjectCount();
    const flagged  = getFlaggedCount();
    const vip      = getVIPHits();
    const timeMod  = getTimeModifier();
    const arrRate  = getArrivalRateScore();
    const delta    = getUnreadDeltaScore(unread);
    const sc    = settings.scoring;
    const score = Math.max(0, Math.min(100,
      sc.base + delta + arrRate + Math.min(sc.urgentMax, urgent * sc.urgentPer) + Math.min(sc.flaggedMax, flagged * sc.flaggedPer) + vip + timeMod
    ));
    console.table({
      'Unread count':       unread,
      'Baseline avg':       baseline.avg?.toFixed(1) ?? 'n/a',
      'Baseline samples':   baseline.samples,
      'Unread delta score': delta,
      'Arrival rate score': arrRate,
      'Urgent subjects':    urgent,
      'Flagged emails':     flagged,
      'VIP hits':           vip,
      'Time modifier':      timeMod,
      '── Total score':     score,
      '── Mood':            currentMood,
    });
    return { unread, urgent, flagged, vip, timeMod, arrRate, delta, score, mood: currentMood };
  };

  window.__hdjSetMood = function(mood) {
    const valid = ['zen','flowing','focused','charged','emergency'];
    if (!valid.includes(mood)) { console.warn('HDJ: valid moods are', valid); return; }
    currentMood = mood;
    updateToggleColor(mood);
    const btn = document.getElementById('hdj-toggle');
    if (btn) btn.classList.toggle('hdj-has-suggestion', mood !== lastAcknowledgedMood);
    console.log('HDJ: mood forced to', mood);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
