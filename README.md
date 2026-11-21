# Pashu Saathi · पशु साथी

An Android-first livestock register in English and Hindi for village animal owners, dairy farmers, and veterinary workers.

## Open the app

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
