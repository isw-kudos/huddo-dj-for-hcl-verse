/* Huddo DJ for HCL Verse — content.js */
'use strict';

if (window.__hdjLoaded) {
  // Already injected — nothing to do
} else {
  window.__hdjLoaded = true;

  const _api = typeof browser !== 'undefined' ? browser : chrome;

  // ── UI STRINGS (localisation) ──────────────────────────────────────────

  const UI_STRINGS = {
    'en-AU': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'No playlist set for this mood \u2014 add one in settings',
      close:       'Close',
      nowPlaying:  'Now Playing \u266b',
    },
    'en-GB': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'No playlist set for this mood \u2014 add one in settings',
      close:       'Close',
      nowPlaying:  'Now Playing \u266b',
    },
    'en': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'No playlist set for this mood \u2014 add one in settings',
      close:       'Close',
      nowPlaying:  'Now Playing \u266b',
    },
    'de': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Keine Playlist f\u00fcr diese Stimmung \u2014 eine in den Einstellungen hinzuf\u00fcgen',
      close:       'Schlie\u00dfen',
      nowPlaying:  'Wird gespielt \u266b',
    },
    'fr': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Aucune playlist d\u00e9finie pour cette humeur \u2014 ajoutez-en une dans les param\u00e8tres',
      close:       'Fermer',
      nowPlaying:  'En cours de lecture \u266b',
    },
    'it': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Nessuna playlist impostata per questo umore \u2014 aggiungine una nelle impostazioni',
      close:       'Chiudi',
      nowPlaying:  'In riproduzione \u266b',
    },
    'es': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'No hay playlist para este estado de \u00e1nimo \u2014 a\u00f1ade una en ajustes',
      close:       'Cerrar',
      nowPlaying:  'Reproduciendo \u266b',
    },
    'pt-BR': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Nenhuma playlist definida para este humor \u2014 adicione uma nas configura\u00e7\u00f5es',
      close:       'Fechar',
      nowPlaying:  'Reproduzindo \u266b',
    },
    'nl': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Geen afspeellijst ingesteld voor deze stemming \u2014 voeg er een toe in de instellingen',
      close:       'Sluiten',
      nowPlaying:  'Wordt afgespeeld \u266b',
    },
    'ru': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\u041f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 \u043d\u0435 \u0437\u0430\u0434\u0430\u043d \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u044f \u2014 \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0435\u0433\u043e \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445',
      close:       '\u0417\u0430\u043a\u0440\u044b\u0442\u044c',
      nowPlaying:  '\u041f\u0440\u043e\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u266b',
    },
    'pl': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Brak playlisty dla tego nastroju \u2014 dodaj j\u0105 w ustawieniach',
      close:       'Zamknij',
      nowPlaying:  'Odtwarzanie \u266b',
    },
    'cs': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\u017d\u00e1dn\u00fd playlist pro tuto n\u00e1ladu \u2014 p\u0159idejte ho v nastaven\u00ed',
      close:       'Zav\u0159\u00edt',
      nowPlaying:  'P\u0159ehr\u00e1v\u00e1 se \u266b',
    },
    'hu': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Nincs lej\u00e1tsz\u00e1si lista ehhez a hangulathoz \u2014 adj hozz\u00e1 egyet a be\u00e1ll\u00edt\u00e1sokban',
      close:       'Bez\u00e1r\u00e1s',
      nowPlaying:  'Lej\u00e1tsz\u00e1s \u266b',
    },
    'ja': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\u3053\u306e\u30e0\u30fc\u30c9\u306e\u30d7\u30ec\u30a4\u30ea\u30b9\u30c8\u304c\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u307e\u305b\u3093 \u2014 \u8a2d\u5b9a\u3067\u8ffd\u52a0\u3057\u3066\u304f\u3060\u3055\u3044',
      close:       '\u9589\u3058\u308b',
      nowPlaying:  '\u518d\u751f\u4e2d \u266b',
    },
    'ko': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\uc774 \uae30\ubd84\uc5d0 \uc124\uc815\ub41c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4 \u2014 \uc124\uc815\uc5d0\uc11c \ucd94\uac00\ud558\uc138\uc694',
      close:       '\ub2eb\uae30',
      nowPlaying:  '\uc7ac\uc0dd \uc911 \u266b',
    },
    'zh': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\u6b64\u60c5\u7eea\u6ca1\u6709\u8bbe\u7f6e\u64ad\u653e\u5217\u8868 \u2014 \u5728\u8bbe\u7f6e\u4e2d\u6dfb\u52a0\u4e00\u4e2a',
      close:       '\u5173\u95ed',
      nowPlaying:  '\u64ad\u653e\u4e2d \u266b',
    },
    'zh-TW': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  '\u6b64\u60c5\u7dd2\u6c92\u6709\u8a2d\u5b9a\u64ad\u653e\u6e05\u55ae \u2014 \u5728\u8a2d\u5b9a\u4e2d\u65b0\u589e\u4e00\u500b',
      close:       '\u95dc\u9589',
      nowPlaying:  '\u64ad\u653e\u4e2d \u266b',
    },
    'eu': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'Ez dago playlist bat aldarte honetarako \u2014 gehitu bat ezarpenetan',
      close:       'Itxi',
      nowPlaying:  'Erreproduzitzen \u266b',
    },
    'ca': {
      toggleTitle: 'Huddo DJ for HCL Verse (Alt+D)',
      noPlaylist:  'No hi ha cap llista de reproducci\u00f3 per a aquest estat d\u2019\u00e0nim \u2014 afegiu-ne una a la configuraci\u00f3',
      close:       'Tanca',
      nowPlaying:  'Reproduint \u266b',
    },
  };

  function getActiveLang() {
    const code = settings.language || navigator.language || 'en';
    if (UI_STRINGS[code]) return code;
    const prefix = code.split('-')[0];
    return Object.keys(UI_STRINGS).find(k => k === prefix) || 'en-AU';
  }

  function getStrings() {
    return UI_STRINGS[getActiveLang()] || UI_STRINGS['en-AU'];
  }

  // ── MOOD LEVELS & SCORING ──────────────────────────────────────────────

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

  // ── SERVICE PLAYLIST DEFAULTS ─────────────────────────────────────────

  const DJ_PLAYLISTS_SPOTIFY = {
    retro:  { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWULEW2RfoSCi', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWWvhKV4FBciw', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX4WgZiuR77Ef', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX1MUPbVKMgJE' },
    rock:   { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX6xOPeSOGone', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U', focused: 'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX1X7WV84927n', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWTcqUzwhNmKv' },
    reggae: { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX83I5je4W4rP', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DXbSbnqxMTGx9', focused: 'https://open.spotify.com/playlist/37i9dQZF1E4BF4A7UFAmeI', charged: 'https://open.spotify.com/playlist/37i9dQZF1DXan38dNVDdl4', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWW7BONj8RiqI' },
    jazz:   { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI', charged: 'https://open.spotify.com/playlist/37i9dQZF1EIeHZ9VTUfOrv', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX3rTk9UUrbYS' },
    lofi:       { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn', focused: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS', charged: 'https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP' },
    hiphop:     { zen: 'https://open.spotify.com/playlist/37i9dQZF1DWVA1Gq4XHa6U', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq', focused: 'https://open.spotify.com/playlist/37i9dQZF1DWY6tYEFs22tT', charged: 'https://open.spotify.com/playlist/37i9dQZF1DWY4xHQp97fN6', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd' },
    electronic: { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n', focused: 'https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX8tZsk68tuDw', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675' },
    classical:  { zen: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', flowing: 'https://open.spotify.com/playlist/37i9dQZF1DWVFeEut75IAL', focused: 'https://open.spotify.com/playlist/37i9dQZF1DXd5zUwdn6lPb', charged: 'https://open.spotify.com/playlist/37i9dQZF1DX2aCk0vzzaZQ', emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX9G9wwzwWL2k' }
  };

  const DJ_PLAYLISTS_APPLEMUSIC = {
    retro:  { zen: 'https://music.apple.com/us/playlist/quiet-storm-essentials/pl.de50676316b8498fb257847815cfcde9', flowing: 'https://music.apple.com/us/playlist/soulful-70s/pl.c1f19746fab040e29d609acf3582d9df', focused: 'https://music.apple.com/us/playlist/funk-essentials/pl.d3a816dac5504f4fa364ccab8ba40061', charged: 'https://music.apple.com/us/playlist/best-of-disco-hits/pl.dd3c0fce4ebd449387fb9273b182f2be', emergency: 'https://music.apple.com/us/playlist/disco-deep-cuts/pl.e9ffa7c33a824c7da1aa0e1362b89591' },
    rock:   { zen: 'https://music.apple.com/us/playlist/rock-hits-unplugged/pl.5cd369ebc40b49d883b643c67d1e493d', flowing: 'https://music.apple.com/us/playlist/open-road-rockers-essentials/pl.38a5a6949d5645528d30be69210a6197', focused: 'https://music.apple.com/us/playlist/classic-rock-essentials/pl.1a7fd42205674dd282d106f533f4bea6', charged: 'https://music.apple.com/us/playlist/90s-hard-rock-essentials/pl.e6678ca6825344bb8b2599909b34e151', emergency: 'https://music.apple.com/us/playlist/extreme-metal/pl.1baada6675ca477cbe9946b3d21c5757' },
    reggae: { zen: 'https://music.apple.com/us/playlist/dub-essentials/pl.670df4df61b24072a35d436b4babe34b', flowing: 'https://music.apple.com/us/playlist/all-reggae/pl.70e5370006504b09bff1119a281119f0', focused: 'https://music.apple.com/us/playlist/roots-reggae-essentials/pl.feff5243ee0d4dac9a6797dcd1655e3b', charged: 'https://music.apple.com/us/playlist/dancehall-essentials/pl.6f6a3b3ea84140d2accad4e8cba793e4', emergency: 'https://music.apple.com/us/playlist/dancehall-party/pl.ff6b7bc129974cf78b7fd72c22caa46c' },
    jazz:   { zen: 'https://music.apple.com/us/playlist/jazz-chill/pl.63271312c084419891982eab46cc68ac', flowing: 'https://music.apple.com/us/playlist/best-of-cool-jazz/pl.f1c48202b0a6428d9b12fbd540b4ae47', focused: 'https://music.apple.com/us/playlist/jazz-standards-essentials/pl.1df21488f86845b790c2bd751d2fcc4a', charged: 'https://music.apple.com/us/playlist/hard-bop-essentials/pl.b3f47883cff249eda4701069d8491fd1', emergency: 'https://music.apple.com/us/playlist/free-jazz-essentials/pl.eadc259e6ed34923a0fd20d92213ee69' },
    lofi:       { zen: 'https://music.apple.com/us/playlist/ambient-chill/pl.bed492442a53481f98e98c6c4da9e01d', flowing: 'https://music.apple.com/us/playlist/lofi-girl-beats-to-relax-study-to/pl.bf7a3cbca49644d8a33f09c1285aef5c', focused: 'https://music.apple.com/us/playlist/lofi-hip-hop-beats-to-relax-code-study-and-focus/pl.e27dd96b0d73426fba75dffd2a7f3607', charged: 'https://music.apple.com/us/playlist/up-beat-lofi/pl.3c657a4ea4914945b6320e5f9aea2d77', emergency: 'https://music.apple.com/us/playlist/lo-fi-breeze/pl.7197f862319747fcbb944c7baec9c2b6' },
    hiphop:     { zen: 'https://music.apple.com/us/playlist/late-night-hip-hop/pl.c15a5391c65e44759efc3083463f88c4', flowing: 'https://music.apple.com/us/playlist/hip-hop-throwback/pl.5cc74856fdab4a65a33f5bd706ba88da', focused: 'https://music.apple.com/us/playlist/conscious-hip-hop-essentials/pl.f1a08ab31a35420d81a4dd62d12bf58d', charged: 'https://music.apple.com/us/playlist/the-trap/pl.219740042a4947d68b05556e570dcb00', emergency: 'https://music.apple.com/us/playlist/hype-workout/pl.f305ae37fa9141598659571996aece09' },
    electronic: { zen: 'https://music.apple.com/us/playlist/ambient-essentials/pl.472dc0c5efe548bb9846e484378aa47b', flowing: 'https://music.apple.com/us/playlist/melodic-house-techno/pl.9642e1be452d43fca846dead91e6e8aa', focused: 'https://music.apple.com/us/playlist/deep-house-essentials/pl.b1f711892e794475ba644d1d2f21fe53', charged: 'https://music.apple.com/us/playlist/big-room-progressive-edm/pl.9f31633e78554bc0802774dd9821c244', emergency: 'https://music.apple.com/us/playlist/hard-dance-hard-trance-tech-hardstyle/pl.179d606b13034cdd9d7ca5a6841edd39' },
    classical:  { zen: 'https://music.apple.com/us/playlist/relaxing-classical/pl.c2ab8af2e9e74576b3bb45d62819d5cd', flowing: 'https://music.apple.com/us/playlist/baroque-essentials/pl.4f94ca7ffe7d48538bd0e2606f1d3bbb', focused: 'https://music.apple.com/us/playlist/classical-concentration/pl.cf8514b686374fadbe6807a6339dfd89', charged: 'https://music.apple.com/us/playlist/classical-hits/pl.9dc583e20e344cc4bf7dc823abde7a2c', emergency: 'https://music.apple.com/us/playlist/epic-classical-music/pl.dc81f460b5fa49fda46c86489135aaff' }
  };

  const DJ_PLAYLISTS_YOUTUBEMUSIC = {
    retro:  { zen: '', flowing: 'https://music.youtube.com/playlist?list=RDCLAK5uy_nxZ3Bp0gO6_Wkb3bp9jESFoOz6bANXw4s', focused: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kzJF5L0orSQpW0MBQyGjFlWVm2J_TmQPo', charged: '', emergency: '' },
    rock:   { zen: 'https://music.youtube.com/playlist?list=PLCD0445C57F2B7F41', flowing: '', focused: '', charged: 'https://music.youtube.com/playlist?list=PL3485902CC4FB6C67', emergency: '' },
    reggae: { zen: '', flowing: '', focused: '', charged: '', emergency: '' },
    jazz:   { zen: '', flowing: '', focused: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kyZ7N5lM0kUpn7NbydMRujcq4aTEesP9I', charged: '', emergency: '' },
    lofi:       { zen: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM', flowing: 'https://music.youtube.com/playlist?list=RDCLAK5uy_lakC34Al6Kd5kidN8Bq0jpdnGUpIw2ctQ', focused: '', charged: '', emergency: '' },
    hiphop:     { zen: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kKEOZ3x5ED4hNxb8lHXhOp5cHFW_CbwMk', flowing: '', focused: 'https://music.youtube.com/playlist?list=RDCLAK5uy_n7QjhERM2Q4Ha5B6t6ZmzyhOtRYjQtxKk', charged: '', emergency: '' },
    electronic: { zen: 'https://music.youtube.com/playlist?list=RDCLAK5uy_mPolD_J22gS1SKxufARWcTZd1UrAH_0ZI', flowing: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kBbljBMZ2exMXUc3MZdtXHsMwvGqf3eE8', focused: '', charged: '', emergency: '' },
    classical:  { zen: '', flowing: '', focused: '', charged: '', emergency: '' }
  };

  const SERVICE_PLAYLIST_DEFAULTS = {
    spotify:      DJ_PLAYLISTS_SPOTIFY,
    applemusic:   DJ_PLAYLISTS_APPLEMUSIC,
    youtubemusic: DJ_PLAYLISTS_YOUTUBEMUSIC
  };

  function resolvePlaylist(djId, mood) {
    const userOverride = (settings.playlists[djId] || {})[mood];
    if (userOverride) return userOverride;
    const svcDefaults = SERVICE_PLAYLIST_DEFAULTS[settings.musicService] || DJ_PLAYLISTS_SPOTIFY;
    return (svcDefaults[djId] || {})[mood] || '';
  }

  // ── DJ PERSONALITIES ───────────────────────────────────────────────────

  const DJS = {
    retro: {
      name: 'DJ Spinmaster', emoji: '🕺', tagline: 'Vinyl crate energy, disco soul',
      playlists: {
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q', // Uplifting Soul Classics
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DWULEW2RfoSCi', // 70s Soul Classics
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DWWvhKV4FBciw', // Funk & Soul Classics
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DX4WgZiuR77Ef', // All Funked Up
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX1MUPbVKMgJE', // Disco Forever
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DX6xOPeSOGone', // Soft Rock
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U', // Rock Classics
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh', // Classic Rock Drive
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DX1X7WV84927n', // Hard Rock
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWTcqUzwhNmKv', // Kickass Metal
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DX83I5je4W4rP', // Beach Vibes
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DXbSbnqxMTGx9', // Reggae Classics
        focused:   'https://open.spotify.com/playlist/37i9dQZF1E4BF4A7UFAmeI', // Roots Reggae Radio
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DXan38dNVDdl4', // Dancehall Official
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DWW7BONj8RiqI', // Massive Soca Hits
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1', // Coffee Table Jazz
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI', // Jazz in the Background
        charged:   'https://open.spotify.com/playlist/37i9dQZF1EIeHZ9VTUfOrv', // Bebop Jazz Piano Mix
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX3rTk9UUrbYS', // Avant-Jazz
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ', // Deep Focus
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn', // lofi beats
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS', // chill lofi study beats
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7', // Brain Food
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP', // Beast Mode
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DWVA1Gq4XHa6U', // Gold School
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq', // Feelin' Myself
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DWY6tYEFs22tT', // Hip-Hop Central
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DWY4xHQp97fN6', // Get Turnt
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY', // Ambient Relaxation
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n', // mint
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr', // Power Hour
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DX8tZsk68tuDw', // Dance Rising
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675', // Techno Bunker
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
        zen:       'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
        flowing:   'https://open.spotify.com/playlist/37i9dQZF1DWVFeEut75IAL', // Calming Classical
        focused:   'https://open.spotify.com/playlist/37i9dQZF1DXd5zUwdn6lPb', // Classical Focus
        charged:   'https://open.spotify.com/playlist/37i9dQZF1DX2aCk0vzzaZQ', // Dramatic Classical
        emergency: 'https://open.spotify.com/playlist/37i9dQZF1DX9G9wwzwWL2k', // Epic Classical
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
    musicService:     'spotify',
    autoChange:       false,
    scoring:          { ...DEFAULT_SCORING },
    urgentKeywords:   [...URGENT_KEYWORDS],
    language:         ''
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
         'edj_baseline', 'edj_musicService', 'edj_autoChange', 'edj_scoring', 'edj_urgentKeywords', 'edj_language'],
        r => {
          settings.verseUrl         = r.edj_verseUrl || '';
          settings.dj               = r.edj_dj || 'lofi';
          settings.playlists        = r.edj_playlists || {};
          settings.vipSenders       = r.edj_vipSenders || [];
          settings.musicService     = r.edj_musicService || 'spotify';
          settings.autoChange       = r.edj_autoChange || false;
          settings.scoring          = r.edj_scoring ? { ...DEFAULT_SCORING, ...r.edj_scoring } : { ...DEFAULT_SCORING };
          settings.urgentKeywords   = r.edj_urgentKeywords || [...URGENT_KEYWORDS];
          settings.language         = r.edj_language || '';
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
          const w = parseInt(pos.width)  || 300;
          const h = parseInt(pos.height) || 200;
          const clampedLeft = Math.min(Math.max(0, parseInt(pos.left)), window.innerWidth  - w - 8);
          const clampedTop  = Math.min(Math.max(0, parseInt(pos.top)),  window.innerHeight - h - 8);
          panel.style.left   = clampedLeft + 'px';
          panel.style.top    = clampedTop  + 'px';
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
    btn.title = getStrings().toggleTitle;
    // Headphone icon
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5v-2a7 7 0 1 1 14 0v2h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"/>
    </svg>`;
    btn.addEventListener('click', e => { e.stopPropagation(); togglePanel(); });
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
    }

    const dj       = DJS[settings.dj] || DJS.lofi;
    const moodData = dj[mood];
    const color    = MOOD_COLORS[mood];
    const playlistUri = resolvePlaylist(settings.dj, mood);

    const panel = document.createElement('div');
    panel.id = 'hdj-panel';
    panel.setAttribute('data-mood', mood);

    const s = getStrings();
    const actionsHtml = playlistUri
      ? `<div class="hdj-actions">
           <button class="hdj-btn-play" data-uri="${esc(playlistUri)}">${esc(moodData.playBtn)}</button>
           <button class="hdj-btn-pass">${esc(moodData.passBtn)}</button>
         </div>`
      : `<div class="hdj-connect-cta">
           <p class="hdj-connect-hint">${esc(s.noPlaylist)}</p>
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
        <button class="hdj-close" title="${esc(s.close)}" aria-label="${esc(s.close)}">✕</button>
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
    wirePanel(panel, mood);
  }

  function wirePanel(panel, mood) {
    panel.querySelector('.hdj-close').addEventListener('click', closePanel);

    // Close panel when clicking outside it
    document.addEventListener('click', function onOutsideClick(e) {
      if (!panel.isConnected) {
        document.removeEventListener('click', onOutsideClick);
        return;
      }
      if (!panel.contains(e.target)) {
        closePanel();
        document.removeEventListener('click', onOutsideClick);
      }
    });

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
        if (uri) {
          // Open the full service page in a compact popup window.
          // window.open() from a click handler carries the user gesture,
          // allowing the service's own player to autoplay on load.
          const autoplayUrl = uri + (uri.includes('?') ? '&' : '?') + 'autoplay=1';
          window.open(autoplayUrl, 'hdj-player', 'popup,width=700,height=500');
          playBtn.textContent = getStrings().nowPlaying;
        }
      });
    }

    const passBtn = panel.querySelector('.hdj-btn-pass');
    if (passBtn) {
      passBtn.addEventListener('click', closePanel);
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

  // ── POLLING LOOP ───────────────────────────────────────────────────────

  function runMoodCheck() {
    const mood = calculateMood();
    currentMood = mood;
    lastMoodCheckAt = Date.now();

    if (settings.autoChange && mood !== lastAcknowledgedMood) {
      // Auto-switch playlist to match new mood
      const uri = resolvePlaylist(settings.dj, mood);
      if (!uri) return; // no playlist configured for this mood/service
      const autoplayUri = uri + (uri.includes('?') ? '&' : '?') + 'autoplay=1';
      // Navigate the existing hdj-player popup if open; window.open() on a named
      // window that already exists is navigation (not a popup) so it isn't blocked.
      // If the popup is closed, fall back to opening a new tab.
      const popupWin = window.open(autoplayUri, 'hdj-player', 'popup,width=700,height=500');
      if (!popupWin) {
        _api.runtime.sendMessage({ type: 'URL_PLAY', url: autoplayUri });
      }
      lastAcknowledgedMood = mood;
      const btn = document.getElementById('hdj-toggle');
      if (btn) {
        btn.setAttribute('data-mood', mood);
        btn.style.setProperty('--hdj-ring', 'transparent');
      }
    } else {
      updateToggleColor(mood);
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
      const keys = ['edj_verseUrl', 'edj_dj', 'edj_playlists', 'edj_vipSenders', 'edj_musicService', 'edj_autoChange', 'edj_scoring', 'edj_urgentKeywords', 'edj_language'];
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


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
