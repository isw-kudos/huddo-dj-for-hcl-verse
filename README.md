# Huddo DJ for HCL Verse

The right music for your inbox mood — automatically. Huddo DJ reads your HCL Verse inbox, calculates a mood score in real time, and queues up the perfect playlist on Spotify, Apple Music, or YouTube Music.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Firefox-yellow)
![HCL Verse](https://img.shields.io/badge/HCL%20Verse-compatible-blueviolet)

> **⚠️ Disclaimer — Use at your own risk.**
> This extension is an independent, open-source community project and is **not affiliated with, endorsed by, or supported by HCL Software, Spotify, Apple, Google, or any other company** whose products it integrates with. It is provided "as is" with no warranty of any kind. See the [full disclaimer](#disclaimer) below.

---

## What it does

A floating DJ button sits in the corner of your HCL Verse inbox. Every two minutes it scans your inbox — counting urgent subjects, flagged emails, recent message volume, and VIP senders — and calculates a **mood score**. That score maps to one of five moods, and each mood has a curated playlist ready to go for whichever DJ persona you've chosen.

Click the button to open the panel. Your DJ greets you, reads the room, and offers to play. One click opens the playlist in a compact popup window — Spotify, Apple Music, or YouTube Music — with autoplay where the service supports it.

---

## Features

- **5 moods** — Zen 🟢, Flowing 🔵, Focused 🟡, Charged 🟠, Emergency 🔴 — each with its own colour, quote, and playlist
- **8 DJ personas** — each with a distinct musical style and personality
- **3 music services** — Spotify, Apple Music, YouTube Music — each opens in a compact popup window with autoplay (Spotify & Apple Music support `?autoplay=1`; YouTube Music opens the playlist directly)
- **Auto Change Playlist** — optionally switches to the matching playlist automatically when your mood changes (Spotify and Apple Music only)
- **Intelligent scoring** — weighted signals including urgent subject keywords, flagged emails, recent email volume, VIP sender ratings, and time-of-day adjustments
- **Fully configurable scoring** — tune every weight and mood threshold to match your working style
- **Custom playlists** — override the default playlist for any DJ × mood combination
- **Export / import playlists** — save your custom playlist set as a JSON file and reload it in any browser
- **Draggable & resizable** panel — position and size it wherever you want
- **Keyboard shortcut** — `Alt+D` toggles the panel without touching the mouse
- **Auto mood-change alerts** — the button pulses when your mood shifts, so you always know when things are heating up

---

## The DJs

Each DJ has a distinct personality and a full set of curated playlists across all five moods.

| DJ | Genre | Vibe |
|---|---|---|
| 🕺 **DJ Spinmaster** | Retro / Disco / Soul | Vinyl crate energy, disco soul |
| 🤘 **DJ Thunderstrike** | Rock | High drama — everything's a guitar solo |
| 🌴 **DJ One Love** | Reggae / Dancehall | Nothing's that urgent — ride the wave |
| 🎷 **DJ Coltrane** | Jazz | Sophisticated — reads the inbox like a chord chart |
| ☕ **dj study** | Lo-fi | minimal. lowercase. rain and coffee vibes. |
| 🎤 **MC Overload** | Hip-Hop | Every email's a bar. Inbox is the stage. |
| 🎛️ **DJ Circuit** | Electronic | Inbox synced to the BPM. Stay in the grid. |
| 🎼 **DJ Maestro** | Classical | The inbox is your symphony — conduct accordingly. |

---

## Music Services

| Service | How it works | Autoplay | Account needed? |
|---|---|---|---|
| **Spotify** | Opens the playlist in a compact popup window with `?autoplay=1` | ✅ Yes | Free or Premium |
| **Apple Music** | Opens the playlist in a compact popup window with `?autoplay=1` | ✅ Yes | Apple Music subscription |
| **YouTube Music** | Opens the playlist in a compact popup window | ❌ No URL-based autoplay | Free or Premium |

Select your music service in the **Music Service** card in the extension settings.

---

## The Mood System

Every two minutes, the extension scans your visible inbox and calculates a score from 0–100 using configurable weighted signals:

| Signal | What it measures |
|---|---|
| **Base score** | Starting point before any signals — defaults to 50 (neutral) |
| **Urgent subject keywords** | Points per email whose subject matches your keyword list |
| **Flagged / high importance** | Points per flagged or high-importance email |
| **Recent email volume** | Points based on emails received in the last 30 minutes (scaled across 5 buckets) |
| **VIP senders** | Extra weight for emails from contacts you've tagged as VIPs |
| **Time-of-day modifiers** | Adjustments for late Friday, Monday morning rush, early/late hours, weekends |

The final score maps to a mood based on configurable thresholds (defaults: Zen < 20, Flowing < 40, Focused < 60, Charged < 80, Emergency ≥ 80).

### Moods

| Mood | Default colour | Feeling |
|---|---|---|
| 🟢 **Zen** | Green | Quiet inbox, clear head |
| 🔵 **Flowing** | Blue | Steady, manageable, in the zone |
| 🟡 **Focused** | Amber | Picking up — stay sharp |
| 🟠 **Charged** | Orange | Busy — time to lock in |
| 🔴 **Emergency** | Red | All hands on deck |

---

## Installation

### 1. Download the extension

Click the green **Code** button on this page and choose **Download ZIP**, then unzip the folder.

Or with Git:
```bash
git clone https://github.com/isw-kudos/huddo-dj-for-hcl-verse.git
```

### 2. Load into your browser

#### Chrome, Edge, Brave, Arc, or any Chromium browser

1. Go to `chrome://extensions`
2. Enable **Developer mode** (toggle, top-right)
3. Click **Load unpacked**
4. Select the `huddo-dj-for-hcl-verse` folder

#### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select the `manifest.json` file inside the folder

> **Note:** Firefox temporary add-ons are removed on restart. For a permanent install, the extension must be signed and published via [addons.mozilla.org](https://addons.mozilla.org). Firefox Developer Edition and Nightly can load unsigned extensions permanently via `about:config` → `xpinstall.signatures.required = false`.

### 3. Configure the extension

1. Click the **Huddo DJ** icon in the toolbar
2. Enter your **HCL Verse URL** (e.g. `mail.yourcompany.com/verse`)
3. Choose your **music service** (Spotify, Apple Music, or YouTube Music)
4. Choose a **DJ** and review the default playlists — customise any you like
5. Adjust **scoring weights** and **mood thresholds** if you want to tune the sensitivity
6. Click **Save settings**
7. Refresh your Verse tab

### 4. Use it

Open HCL Verse — you'll see a coloured **DJ button** in the bottom-right corner. Its colour reflects your current mood. Click it to open the panel, then click **Play** to start the music.

### 5. Update companion extensions (if installed)

If you also have [Huddo AI Assistant for HCL Verse](https://github.com/isw-kudos/huddo-ai-assistant-for-verse) or [Huddo LinkedIn Lookup](https://github.com/isw-kudos/huddo-linkedin-lookup) installed, make sure they are both up to date. These extensions run side by side in your Verse tab and share the same DOM — running mismatched versions can cause the panels to overlap or interfere with each other. Pull the latest code for each and reload them in your browser the same way you loaded this one.

---

## Custom Playlists

In the **Custom Playlists** settings card, you can override the default playlist for any DJ and mood combination:

- **Spotify**: paste a Spotify playlist URL — e.g. `https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ`
- **Apple Music**: paste an Apple Music playlist URL — e.g. `https://music.apple.com/us/playlist/…`
- **YouTube Music**: paste a YouTube Music playlist URL — e.g. `https://music.youtube.com/playlist?list=…`

### Export & Import

Use the **Export playlists** button to download your custom playlists as a JSON file. Use **Import playlists** to reload them in another browser or after reinstalling the extension. Exported files include the music service and are versioned for forward compatibility.

---

## Project Structure

```
huddo-dj-for-hcl-verse/
├── manifest.json      # Extension config & permissions
├── background.js      # URL-launch handler for Spotify, Apple Music, and YouTube Music; re-injection on reload
├── content.js         # Mood scoring engine, floating panel UI, DJ personas, playlist defaults
├── styles.css         # Panel and toggle button styling
├── popup.html         # Settings popup
├── popup.js           # Settings logic, service selector, playlist validation, export/import
└── icons/             # Extension icons (16, 32, 48, 128px)
```

---

## Works great alongside

[Huddo AI Assistant for HCL Verse](https://github.com/isw-kudos/huddo-ai-assistant-for-verse) — summarise emails, draft replies, and chat with an AI about your inbox. Both extensions run side by side without interfering.

---

## Privacy

- No data is collected, transmitted, or stored outside your browser
- The mood score is calculated entirely locally by reading your visible inbox — nothing is sent anywhere automatically
- The extension activates only on the Verse domain you configure
- No analytics, no tracking, no telemetry of any kind

---

## Compatibility

| Browser | Status |
|---|---|
| Chrome 120+ | ✅ Tested |
| Edge (Chromium) | ✅ Compatible |
| Brave / Arc | ✅ Compatible |
| Firefox 128+ | ✅ Compatible |

| HCL Verse version | Status |
|---|---|
| Verse 3.2.x | ✅ Tested |
| Verse On-Premises 2.x | ✅ Compatible |
| Earlier versions | ⚠️ May work — DOM structure can vary |

> HCL Verse's DOM structure varies between versions and deployments. If mood detection isn't working correctly on your instance, please [open an issue](https://github.com/isw-kudos/huddo-dj-for-hcl-verse/issues) with your Verse version.

---

## Contributing

Contributions are welcome! Some ideas:

- Additional DJ personas and genres
- More music service integrations
- Smarter mood signals (calendar busyness, thread depth, sender sentiment)
- Chrome Web Store / Firefox Add-ons publication

To contribute:
1. Fork this repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

---

## Disclaimer

This extension is an independent, open-source project created by [ISW Development Pty Ltd](https://isw.net.au). It is **not affiliated with, endorsed by, or in any way connected to HCL Software, Spotify, Apple, Google, or any other company** whose products it integrates with. All trademarks are the property of their respective owners.

**Use at your own risk.** This software is provided "as is", without warranty of any kind — express or implied — including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. The authors accept no liability for any loss or damage arising from its use.

---

## License

MIT License — Copyright (c) 2026 ISW Development Pty Ltd
See [LICENSE](LICENSE) for full details.

---

## Author

Created by **Adam Brown** at [ISW Development Pty Ltd](https://isw.net.au)

- 🌐 [isw.net.au](https://isw.net.au)
- 🐙 [huddo.com](https://huddo.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/adambrownaus/)
