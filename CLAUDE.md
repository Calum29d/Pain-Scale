# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project overview

Pain-Scale is an Expo (React Native + web) app presenting validated clinical pain-assessment scales
(Wong-Baker FACES, VAS pain ruler, FLACC, CRIES) to help healthcare professionals score a patient's pain.
Routing is file-based via `expo-router` (`main` in package.json is `expo-router/entry`).

## Commands

- `npm run start` (or `npx expo start`) — start the Metro dev server, choose a platform from the CLI menu
- `npm run android` / `npm run ios` / `npm run web` — start targeting a specific platform directly
- `npm run lint` — runs `expo lint` (flat ESLint config in `eslint.config.js`, extends `eslint-config-expo`)
- `npm run reset-project` — Expo template script that moves `app/` to `app-example/` and creates a blank `app/`; do not run this unless the user explicitly asks to blow away the current app code
- There is no test runner configured in this repo.

## Architecture

- **Routing**: every file in `app/` is a screen, matched to a route by filename (`app/faces.tsx` → `/faces`, etc.). `app/_layout.tsx` is the root layout — it wraps the `Stack` navigator in `react-native-paper`'s `PaperProvider`. `app/index.tsx` is the home screen, listing all available scales as cards that `router.push()` into their route.
- **Screen pattern**: each scale screen (`flacc.tsx`, `cries.tsx`, `faces.tsx`, `painRuler.tsx`) is a single self-contained component: local `useState` for wizard state, no shared state/store across screens, and a `StyleSheet.create` block at the bottom of the same file (no shared theme/style module yet). Follow this same shape for new scales rather than introducing global state.
- **Multi-step scoring screens** (`flacc.tsx`, `cries.tsx`): questions are defined as a typed array of `{ section, options: [{ label, value }] }` objects. A `currentIndex` state walks through sections one at a time; a `scores` record (keyed by section name) accumulates the selected value per section so the user can go back and change an earlier answer without losing later ones. Total score is derived (`Object.values(scores).reduce(...)`) and mapped to a textual pain-severity description once `currentIndex` reaches the end of the questions array.
- **Orientation-locked screens** (`faces.tsx`, `painRuler.tsx`): use `expo-screen-orientation` to force landscape on mount (image/ruler needs width) and restore portrait on unmount; the restore is wrapped in try/catch because orientation locking is unreliable in Expo Go.
- **Fonts**: Inter is loaded per-screen via `useFonts` from `@expo-google-fonts/inter` (not lazily/globally) — a screen returns `null` until `fontsLoaded` is true. Match this pattern (declare the exact Inter weights used) rather than centralizing font loading, unless asked to refactor it.
- **Icons**: `@expo/vector-icons` (FontAwesome, MaterialIcons, Entypo) — back navigation consistently uses `FontAwesome name="arrow-left"` inside a `Pressable`, in the same blue (`#005EB8`) used throughout for interactive elements/borders.
- **Styling**: no design-system file — colors/spacing are inlined per screen (background `#F8FAFC`, primary `#005EB8`, card border `#B1B4B6`). Reuse these values for visual consistency in new screens.
- **`app.json`**: `typedRoutes` and `reactCompiler` experiments are enabled — keep route strings/`Href` typed, and avoid patterns the React Compiler can't handle (e.g. manual memoization workarounds are generally unnecessary).
- The `Pain-Scales/` directory at the repo root is an unrelated, untracked nested git repo (not part of this app) — ignore it unless the user specifically asks about it.
