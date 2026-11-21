#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
android_jar=$(find "$sdk/platforms" -name android.jar | sort -V | tail -1)
build_tools=$(find "$sdk/build-tools" -mindepth 1 -maxdepth 1 -type d | sort -V | tail -1)
test -f "$android_jar"
test -x "$build_tools/apksigner"
out="$PWD/android/out"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/classes" "$tmp/assets" "$tmp/dex" "$out"
cp index.html "$tmp/assets/"
"$build_tools/aapt2" compile --dir android/res -o "$tmp/resources.zip"
"$build_tools/aapt2" link -o "$tmp/base.apk" -I "$android_jar" --manifest android/AndroidManifest.xml -A "$tmp/assets" "$tmp/resources.zip"
javac --release 8 -classpath "$android_jar" -d "$tmp/classes" android/src/in/pashusaathi/app/FarmActivity.java
jar cf "$tmp/classes.jar" -C "$tmp/classes" .
"$build_tools/d8" --min-api 26 --lib "$android_jar" --output "$tmp/dex" "$tmp/classes.jar"
(cd "$tmp/dex" && zip -q -0 "$tmp/base.apk" classes.dex)
"$build_tools/zipalign" -f 4 "$tmp/base.apk" "$tmp/aligned.apk"
if [[ -n "${SIGNING_KEYSTORE:-}" ]]; then
    key="$SIGNING_KEYSTORE"
    alias="${SIGNING_ALIAS:?Set SIGNING_ALIAS}"
    : "${SIGNING_PASSWORD:?Set SIGNING_PASSWORD}"
else
    key="$tmp/demo.jks"; alias=pashudemo
    SIGNING_PASSWORD=$(openssl rand -hex 28)
    export SIGNING_PASSWORD
    keytool -genkeypair -keystore "$key" -alias "$alias" -keyalg RSA -keysize 2048 -validity 3650 -storepass:env SIGNING_PASSWORD -keypass:env SIGNING_PASSWORD -dname "CN=Pashu Saathi Demo" -noprompt
fi
"$build_tools/apksigner" sign --ks "$key" --ks-key-alias "$alias" --ks-pass env:SIGNING_PASSWORD --key-pass env:SIGNING_PASSWORD --out "$out/Pashu-Saathi.apk" "$tmp/aligned.apk"
"$build_tools/apksigner" verify --verbose --print-certs "$out/Pashu-Saathi.apk"
"$build_tools/aapt" dump badging "$out/Pashu-Saathi.apk" | grep -E '^(package|sdkVersion|targetSdkVersion|launchable-activity):'
(cd "$out" && sha256sum Pashu-Saathi.apk)
