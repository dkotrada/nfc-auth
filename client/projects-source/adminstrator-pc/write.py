# -*- coding: utf-8 -*-
import sys
import nfc
import ndef

# Das zweite Argument wird Übernommen
# es ist jwtData
jwtData = sys.argv[1]

# Contactess Frontend Objekt
clf = nfc.ContactlessFrontend()

# device = 'usb:002:005'	# oeffne den exacten Reader
device = 'usb'  # oeffne den Ersten gefundenen Reader <usb>

# Prüfe ob das Schreib- Lesegerät erkannt wurde
if clf.open(device) == True:
    print "\nUSB Lese- und Schreibgerät wurde Gefunden!\n"
else:
    print "\nFEHLER: USB Gerät nicht gefunden!\n Programm wird beendet."
    sys.exit(-1)

## bescheiben des Tags
tag = clf.connect(rdwr={'on-connect': lambda tag: False})

# Schreiben des JSON WEB TOKENS auf den Tag
tag.ndef.records = [ndef.TextRecord(jwtData)]
#print "Der Tag wurde beschrieben!"

# Schliessen nach der Operation
clf.close()