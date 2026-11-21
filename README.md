# Pashu Saathi · पशु साथी

An Android-first livestock register in English and Hindi for village animal owners, dairy farmers, and veterinary workers.

## Install on Android

[Download Pashu-Saathi.apk from the latest GitHub release](https://github.com/avinashxthorn/Pashu-/releases/latest/download/Pashu-Saathi.apk). Open the APK on Android 8 or newer and follow the Android installer. The app ships its interface and demo records inside the package and can work in airplane mode.

The Android app uses a native activity, the system photo and backup file pickers, and an embedded WebView. The launch indicator closes when the farm screen is ready. The device Back action returns to the previous screen. Backups go to the location chosen in the Android file picker. Local profiles are demonstration profiles.

The Android workflow verifies the signed package and publishes it to GitHub Releases. For repeatable signing across production updates, run `bash android/build.sh` with a private `SIGNING_KEYSTORE`, `SIGNING_ALIAS`, and `SIGNING_PASSWORD`. Without a supplied key, each build gets its own demo signer.

## Browser edition

Download the repository's **index.html** and open it in Chrome, Edge, Firefox, or Safari. The single file contains the app and runs offline. Keep using the same browser and file location to access saved records. A static web server can also serve this file.

The fictional Rampur demo opens with 12 animals. Select **Add animal** to register an animal in three short steps. Choose **Add record** from its profile to record a visit, vaccination, breeding event, milk yield, feed, payment, or weight. Charts and upcoming care update from the saved entries.

**Animals** supports name, ID, tag, species, condition, owner, village, and vaccination filters. **Reports** includes herd composition, health, coverage, milk trends, feed and milk entries by date, finances, diagnoses, and owner or village totals.

## Local profiles and data

Settings opens profile editing, language selection, in-app care alerts, and a JSON backup download. To start with an empty farm, sign out and create a local profile. Demo profiles use a mobile number as a local identifier. They do not verify phone ownership or provide secure access control.

All entries and uploaded photos stay in browser storage. The public repository contains only app code and fictional sample data. There is no server database, cross-device sync, SMS service, or background push. Clearing browser data removes saved records. Vaccine coverage is an overview of recorded vaccine dates: an animal counts as covered when it has a recorded dose and none of its latest recorded vaccine doses are overdue.

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
npm test
npm run build
```

Development opens farm.html. The build regenerates the self-contained index.html. React and Radix icon licenses are included in THIRD_PARTY_NOTICES.txt.
