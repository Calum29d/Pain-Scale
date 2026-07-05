# Pain-Scale

Pain-Scale is a an app made for IOS and Android that presents validated clinical pain-assessment scales to help healthcare professionals score a patient's pain. It pairs an [Expo](https://expo.dev) / React Native frontend with a Spring Boot + PostgreSQL backend for account management and persisting patients and their assessment history.

## Project Overview

The app implements four validated pain-assessment tools:

- **Wong-Baker FACES** — visual pain assessment for children aged 3 years and older
- **Visual Analogue Scale (VAS) / Pain Ruler** — for patients who can rate their own pain
- **FLACC** (Face, Legs, Activity, Cry, Consolability) — behavioral observation scale for neonates, young children, and patients who cannot reliably self-report pain
- **CRIES** (Crying, Requires oxygen, Increased vital signs, Expression, Sleep) — postoperative pain assessment for neonates

Each scale walks the clinician through a short, structured questionnaire (or an interactive visual/ruler) and produces a total score mapped to a pain-severity description. Healthcare professionals can optionally create an account to manage a patient list and save each assessment's score against a patient's history over time.

The repository contains two parts:

- **`app/`** — the Expo Router frontend (this is the app you run on a device/simulator/browser)
- **`pain-scaleDB/`** — a Spring Boot REST API backend (JWT auth, patients, and pain assessments), backed by PostgreSQL

## Key Features

- Four validated pain scales: Wong-Baker FACES, VAS Pain Ruler, FLACC, and CRIES
- Automatic scoring with a textual pain-severity result derived from the selected answers
- Orientation-locked, landscape-friendly screens for the FACES image and VAS ruler
- Optional account creation/login (JWT-based) to unlock patient management
- Patient list and per-patient detail view showing pain-assessment history
- Save a completed assessment's score directly to a patient's record
- Runs natively on iOS and Android, and also in the browser, from a single codebase

## Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (invoked via `npx`, no global install required)
- A device/simulator: Xcode (iOS), Android Studio (Android), or just a modern browser (web)
- Java 17 and Maven, plus a running [PostgreSQL](https://www.postgresql.org/) instance, if you want to run the backend API

### Frontend (Expo app)

```bash
# from the repo root
npm install
npx expo start
```

From the Metro CLI output you can open the app in a development build, an Android emulator, an iOS simulator, [Expo Go](https://expo.dev/go), or a web browser. You can also target a platform directly:

```bash
npm run android
npm run ios
npm run web
```

### Backend (Spring Boot API)

The backend lives in `pain-scaleDB/` and expects a PostgreSQL database named `registration` on `localhost:5432` (see `pain-scaleDB/src/main/resources/application.yml`). Create a `.env` file in `pain-scaleDB/` with your database credentials:

```
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
```

Then start the API:

```bash
cd pain-scaleDB
./mvnw spring-boot:run
```

The API listens on port `8082` by default.

## Usage Examples

**Score a patient using a pain scale (no account required):**

1. Launch the app and, on the home screen, tap one of the pain-scale cards (e.g. "Wong-Baker FACES").
2. Work through each step of the questionnaire (or select a face/ruler position).
3. On the final step, review the computed score and pain-severity description.

**Save assessments against a patient's history:**

1. From the home screen, tap "Login or create an account" and register or sign in.
2. Tap "Patients" to view or add a patient.
3. Open a patient's detail page to see their past assessments, or start a new assessment and save the resulting score to that patient's record.

**Linting the frontend:**

```bash
npm run lint
```

## License Information

No license file is currently included in this repository. All rights are reserved by the project author unless a license is added.
