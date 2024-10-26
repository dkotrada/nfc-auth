# -*- coding: utf-8 -*-
import sys
import nfc

# Contactess Frontend Objekt
clf = nfc.ContactlessFrontend()

# device = 'usb:002:005'	# oeffne den exacten Reader
device = 'usb'  # oeffne den Ersten gefundenen Reader <usb>

# Prüfe ob das Schreib- Lesegerät erkannt wurde
if clf.open(device) == False:
    sys.exit(-1)

# Suchen des NFC-Tags
clf.sense()

# Verbindung aufbauen
tag = clf.connect(rdwr={'on-connect': lambda tag: False})  # Tag parameter ausgeben

if tag.ndef is None: # NDEF Data ist nicht vorhanden
    clf.close()
    sys.exit(-2)

textRecord = tag.ndef.records.pop()
jwtToken = textRecord.text


# Schliessen nach der Operation
clf.close()

# Ausgabe ohne Newline
sys.stdout.write(jwtToken)

