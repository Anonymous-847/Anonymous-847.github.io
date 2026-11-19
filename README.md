# Anonymous OS Portfolio
1. `cp .env.example .env.local` and set GEMINI_API_KEY.
2. `npm install && npm run dev`
3. Edit content in `data/` (profile, projects, skills). The desktop UI lives in `components/os/`. Assistant knowledge comes from the same data files (`lib/knowledge.js`).
## Assets you must supply
- Portrait: put it at `public/assets/portrait.jpg`, then set `hasPortrait: true` in `data/profile.js`. Until then a neutral silhouette is shown.
- Animated anime character: needs a rigged `.glb` (e.g. made from your portrait in a character tool). Put it in `public/models/` and set `characterModel`; the hero currently renders the portrait through a shader, not a 3D character.

## Look & feel
- Screens >= 768px: GNOME/Ubuntu-style Linux desktop (`components/os/Desktop.js`): top panel, dock, Activities app grid, Control Center, lock screen.
- Screens < 768px: Termux session (`components/os/Termux.js`): Android status bar, extra-keys rows, left session drawer, quick-settings shade.
- Wallpaper: `public/wallpaper.svg` (used by `Desktop.js`). Logo: `components/os/AnonLogo.js`.
- Project cover art + icons are procedural (`components/os/ProjectArt.js`); set `glyph` and `accent` per project in `data/projects.js`, or set `image` to use a real screenshot.
