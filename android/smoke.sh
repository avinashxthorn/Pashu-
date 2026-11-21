#!/usr/bin/env bash
set -euo pipefail
sdk="${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
api=35
image="system-images;android-$api;default;x86_64"
manager="$sdk/cmdline-tools/latest/bin"
set +o pipefail
yes | "$manager/sdkmanager" "$image" "emulator" "platform-tools"
set -o pipefail
echo no | "$manager/avdmanager" create avd --force -n farm-test -k "$image" --device pixel
sudo chmod a+rw /dev/kvm
adb="$sdk/platform-tools/adb"
"$sdk/emulator/emulator" -avd farm-test -no-window -no-audio -no-boot-anim -gpu swiftshader -no-snapshot > /tmp/pashu-emulator.log 2>&1 &
emupid=$!
trap 'kill "$emupid" 2>/dev/null || true' EXIT
timeout 120 "$adb" wait-for-device
for i in $(seq 1 120); do
    if [[ "$("$adb" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = 1 ]]; then break; fi
    sleep 2
done
"$adb" shell input keyevent 82
"$adb" install -r android/out/Pashu-Saathi.apk
"$adb" logcat -c
"$adb" shell am start -W -n in.pashusaathi.app/.FarmActivity
for i in $(seq 1 45); do
    if "$adb" logcat -d -s PashuSaathi:I | grep -F 'Farm records ready'; then
        echo "Installed APK launched and rendered its farm workspace."
        exit 0
    fi
    sleep 2
done
"$adb" logcat -d -s AndroidRuntime:E chromium:E PashuSaathi:I
exit 1
