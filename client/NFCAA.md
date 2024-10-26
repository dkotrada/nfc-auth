# JOURNAL LOG
=====================================================

# Einkaufsliste

## NFC USB Stick - NXP PN533 - Reader/Writer 1 Stück
- https://www.nfc-tag-shop.de/nfc-hardware/nfc-usb-stick-nxp-pn533-reader/writer-124
- https://www.nfc-tag-shop.de/bestellung-auf-rechnung-fuer-oeffentliche-einrichtungen

# Links
- https://www.mifare.net/en/products/tools/
- ISO/IEC_14443 https://de.wikipedia.org/wiki/ISO/IEC_14443
- https://en.wikipedia.org/wiki/Universally_unique_identifier


## MIFARE® DESFire®  NFC Plastik Karte 10 Stück
- NFC Sticker NXP DESFire EV1
- https://www.plastikkartenmonster.de/images/datenblaetter/datenblatt-nxp-mifare-desfire-ev1.pdf
- NDEF Specification https://stackoverflow.com/questions/41249713/configure-mifare-desfire-ev1-as-nfc-forum-type-4-tag-for-ndef
- http://www.nxp.com/docs/en/application-note/AN11004.pdf
- 7 Byte unique identifier http://www.scnf.org.uk/smartstore/4-7_B_ID_Questions_Answeres_V8.pdf


## NFC Karte
 https://www.nfc-tag-shop.de/nfc-karten/nfc-karten-weiss/nfc-karte-pvc-85-mm-x-54-mm-ntag-216-924-byte-weiss-107
 https://www.nfc-tag-shop.de/nfc-karten/nfc-karten-weiss/nfc-karte-pvc-85-mm-x-54-mm-mifare-desfire-ev1-4k-weiss-507
 https://www.nfc-tag-shop.de/nfc-aufkleber/nfc-sticker-weiss-schwarz/nfc-sticker-30-mm-ntag-216-924-byte-weiss-202
- http://apps4android.org/nfc-specifications/NFCForum-TS-Type-2-Tag_1.1.pdf
- PN533 Spezifikation: https://www.nfc-tag-shop.de/media/pdf/07/df/7c/PN533_SDS.pdf
- LibNFC Installationsanleitung: http://nfc-tools.org/index.php?title=Main_Page

# 31.07.17 Arbeiten mit Android Tablets
Pin für das Android Samsung Tablet 10021854-0: `0000`

## Um Bilder vom Android aufzunehmen
`sudo apt install android-tools-adb android-tools-fastboot`
`adb version` Android Debug Bridge version 1.0.32

### Adb Test Installation
`adb devices`

### Bei Problemen mit adb server
`sudo adb kill-server`
`sudo adb start-server`

### ADB Android Debug Bridge Command Line
https://developer.android.com/studio/command-line/adb.html

### Aufnahme von Screenshots
https://www.learn2crack.com/2014/08/capture-screenshot-record-screen-using-adb.html
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png
adb shell rm /sdcard/screen.png

### Internal Storage Directory
Auflisten
`adb shell ls /storage/emulated/0/DCIM/Screenshots`
Aufnehmen
`adb shell screencap -p /storage/emulated/0/DCIM/Screenshots/Info.png`

Siehe den `res` Ordner für aufgenommene screenshots

# Unlock Android device with nfc
http://tagstand.com/blog/nfc-tags-unlock-your-android-phone
~~~
Für Android 7: Einstellungen -> (Wenn kein PIN oder Muster eingerichtet ist. Einrichten.) ->
Andere sicherheitseinstellungen -> Trust agents (Smart Lock muss aktiviert sein) ->
~~~
(weiter mit Vertraunewürdige Geräte https://support.google.com/nexus/answer/6093922?hl=de) ->


# 25. Aug 2017

- APDU https://de.wikipedia.org/wiki/Application_Protocol_Data_Unit

# 29 Aug 2017 HCE Compliance Checker (prüft ob android Gerät HCE kompatibel ist)
https://play.google.com/store/apps/details?id=com.hce.compliance.checker&hl=de

# 05. September 2017 Problem mit Gradle in einem der nfcaa-test Projekte
Could not determine the class-path for interface com.android.builder.model.AndroidProject
https://stackoverflow.com/questions/42777321/could-not-determine-the-class-path-for-interface-com-android-builder-model-andro

- Danach runProguard Zeilen auskommentiert

# 12. September 2017 NFC-Tag auslesen
- Das Projekt heißt `TestLesen`. Kann erweitert werden um schreiben. https://code.tutsplus.com/tutorials/reading-nfc-tags-with-android--mobile-17278
- Weiter vielleicht mit : https://www.sitepoint.com/learn-android-nfc-basics-building-a-simple-messenger/
und https://blog.classycode.com/tunneling-http-over-nfc-on-android-using-host-card-emulation-907947a721ac

# 18. September 2017

PN533 Funkktioniert nicht mit Originaltreibern auf Win7 für Win10 Gibt es keinen Treiber

Auf Linux, list hardware: # sudo lswh -short
H/W-Pfad            Gerät     Klasse    Beschreibung
/0/100/1a/1/1/1               generic   PN533

https://github.com/torvalds/linux/tree/master/drivers/nfc/pn533

- Runde Tags sind NTAG216
- Karten 68414 sind NTAG216
- Karten 68724 sind EV1


# 20. September 2017

- libnfc in Ubunturechner installiert
- code mit den Beispielen von Wiki www.nfc-tools.org findet die Symbole nicht
- Installation mit `nfc-list` getestet -> Funkktioniert
- `lsusb` liefert angeschlossene Geräte

### nfctool von ubuntu
http://manpages.ubuntu.com/manpages/trusty/man1/nfctool.1.html

- `nfctool --list` Funkktioniert nicht.

### Smart Cards https://wiki.ubuntuusers.de/Smart_Cards/
- `pcsc_scan` Funkktioniert nicht.

### NFC Tools JAVA

- https://github.com/grundid/nfctools
- https://github.com/skjolber/ndef-tools-for-android

### Installiere libfreefare
- https://github.com/nfc-tools/libfreefare war ok

### GCC mit libnfc
- `gcc main.c -o main -lnfc`
- alle Beispiele sind im `dev/c` Ordner

### Feststellen ob die Bibliothek installiert ist Linux
- `ldconfig -p | grep libjpeg`

### Abhängigkeiten anschauen ldd - print shared object dependencies
- `ldd <binary>` z.B. ldd main

### Code auf Fehlerüberprüft mit splint und valgrind

- `splint foo.c`
- `valgrind --tool=memcheck --leak-check=full main`

Beide haben bei der Bibliothek Beispielen von libnfc fehler angezeigt.

### Valgrind als External Tools eingebunden

~~~valgrind.py
from subprocess import call
call(["valgrind", "--tool=memcheck", "--leak-check=full", "--show-leak-kinds=all", "./main"])
~~~

### Libnfc Dokumentation
http://www.libnfc.org/api/


### Gefundene Static Analysis Tools
- flawfinder (Python basis)
- Infer von Facebook
wget -O Dockerfile https://raw.githubusercontent.com/facebook/infer/master/docker/Dockerfile
wget -O run.sh https://raw.githubusercontent.com/facebook/infer/master/docker/run.sh
sh run.sh
sudo apt install docker.io
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
sudo usermod -aG docker $(whoami)


### Von #define zu static const
- https://stackoverflow.com/questions/1674032/static-const-vs-define-vs-enum
- https://stackoverflow.com/questions/41125651/constexpr-vs-static-const-which-one-to-prefer

### Die Webseite von nfctools libnfc libfreefare
- http://nfc-tools.github.io/


# Probleme mit Gradle Plugin von Google
In der Datei `build.gradle` hinzufügen `maven { url "https://maven.google.com" }`
~~~.gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        maven { url "https://maven.google.com" }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.0-beta4'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
~~~


# Schreiben der Daten auf NFC-Tags vom Computer aus.
https://gitlab.pi6.fernuni-hagen.de/ks/research/nfcaa/issues/5

# JWT Kodierte Information
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktvbnJhZCIsInZvcm5hbWUiOiJEaWV0ZXIiLCJ6dWdyaWZmc3R1ZmUiOjV9.g7BJUXjcERzHKh_rDSgtsWzm3BDODoDMNhPVfX4afM8


# Random Generator Python
~~~py
import random
string = "QWERTZUIOPLKJHGFDSAYXCVBNMqwertzuioplkjhgfdsayxcvbnm1234567890!"
generated = ''.join(random.SystemRandom().choice(string) for _ in range(64))
print generated
~~~
