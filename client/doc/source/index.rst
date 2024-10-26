.. .. toctree::
	:maxdepth: 2

=============
Projektarbeit
=============

Token-basierte Authentifizierung und Authorisierung der Teilnehmenden innerhalb des Forschungsprojektes Mein Laden.

==========
Einleitung
==========

Durch Entwicklung des Internets steigt die Erreichbarkeit des Einzelhandels für die Menschen, zusätzlich zu Lokalen geschäften entstünden viele rein Virtuelle Geschäfte. Jedoch stellt das Einkaufen Online für ältere Menschen oft viele Hindernisse dar. So wird z.B. Unbedingt ein E-Mail Konto benötigt um sich bei einem Online Händler zu registrieren. Für jeden weiteren Online Händler muss der Kunde sich jedes mal das Passwort ausdenken, jeder Händler stellt zudem unterschiedliche Anforderungen an die Passwortgröße und darin verwendeten Zeichen. usw.
Im Projekt "meinLaden" möchten wir deshalb die Komplexität der Verwaltung eigenes Accounts reduzieren damit der Kunde sich aufs Einkaufen konzentrieren kann.

----------
Motivation
----------

Im Rahmen des Projekts "meinLaden" soll das gemeinsame Einkaufen in einem Geschäft von Zuhause aus ermöglicht werden. Dabei sollen sich die beteiligten Personen locker unterhalten können, ohne den Einkauf aus den Augen zu verlieren.

In :numref:`(Abb. %s) <motivation_abb>` ist ein Einkaufsszenario dargestellt. Die junge Frau Julia und die Seniorin Sara benutzen jeweils ein Tablet, um sowohl miteinander als auch mit dem Einkaufsassistenten Emil im Supermarkt zu kommunizieren. Die Kommunikation findet über Video- und Audio-Kanäle statt. Emil assistiert Julia und Sara beim Einkaufen und trägt eine Video-Brille. Er hat vor sich am Einkaufswagen ein Tablet :numref:`(Abb. %s) <motivation_abb>` zur Darstellung der Einkaufsliste von Julia und Sara. Ein weiteres Gerät ist auf der Vorderseite des Einkaufswagens befestigt und zeigt die Bilder von Julia und Sara an, damit im Supermarkt anwesende Personen erkennen können, dass für Julia und Sara eingekauft wird. Dadurch soll die spontane Interaktion zwischen Personen im Supermarkt und den Seniorinnen zuhause ermöglicht werden. Zusätzlich ist der Einkaufswagen mit einer 360° Kamera und einem Scanner ausgestattet.

.. _motivation_abb:
.. figure:: img/motivation.pdf
	:align: center

	Einkaufen mit Tablets


---------------
Problemstellung
---------------

Damit Julia bzw. Sara am Einkaufen teilnehmen kann, muss sie sich erst registrieren, und sich danach am Tablet (genauer gesagt an der App) anmelden. Hierbei werden oft die Kombination von Benutzernamen und Passwort verwendet, die Julia bzw. Sara sich merken muss. Um es sich besser merken zu können, werden oftmals sehr einfach zu erratende Passwörter verwendet. Das stellt ein hohes Sicherheitsrisiko für das System dar. Bei Senioren kann es mit fortschreitendem Alter dazu kommen, dass sie sich die Passwörter schlechter merken können, was ebenfalls problematisch ist.

Der Einkaufsassistent Emil muss sich ebenfalls registriert haben, um sich vor dem Einkauf für Julia und Sara am System anmelden zu können. Das müssen auch alle anderen Kollegen von Emil tun, damit sie für die anderen Kunden einkaufen können. Während seines Arbeitstages muss Emil die eingesetzten Tablets wechseln, bspw. wenn die Kapazität des Akkus für den anstehenden Einkauf nicht mehr ausreicht oder ein Tablet kaputt geht. Außerdem kann es notwendig werden, dass Emil einen Kollegen während dessen Mittagspause vertritt. Das hat zur Folge, dass Emil den Einkaufswagen seines Kollegen verwendet. D.h. er muss sich an beiden Tablets anmelden.

Es gibt mehrere Möglichkeiten den Problemen wie, das Merken des Passwortes, die Verwendung der unsicheren Passwörter, das Vergessen der Passwörter, schnellwechsel der Geräte zu entgegnen. Zum Beispiel die Verwendung von Fingerabruck oder Gesichterkennung.

Eine weitere Lösung wäre der Einsatz von Nahfeldkommunikation (engl. Near Field Communication, NFC) Tokens bzw Karten. In Wikipedia [#f1]_ wird NFC als ein internationaler Übertragungsstandard zum kontaktlosen Austausch von Daten genannt.


----------------
Aufgabenstellung
----------------

Im Rahmen der vorliegenden Arbeit soll ein Konzept entwickelt werden, das den Nutzenden die Anmeldung mit Hilfe von NFC-Tags an den Android Tablets ermöglicht. Das zu entwickelnde System muss sowohl die Nutzenden als auch die NFC-Tags registrieren und verwalten können. Außerdem muss eine Zuordnung von NFC-Tag zu einem Nutzer möglich sein. Die Zuordnung der Nutzer muss auch gelöscht werden können. Es soll ein Prototyp auf der Basis von Android entwickelt und funktional validiert werden.


-----------------
Rahmenbedingungen
-----------------

Die Projektarbeit ist Bestandteil des Forschungsprojektes "meinLaden" und wird in enger Kooperation mit den anderen Projektmitgliedern allerdings selbständig durchgeführt. Für die Koordination und Abstimmung mit den in Projekt tätigen Personen finden regelmäßige Besprechungen statt. Es sollen ein Konzept, eine Spezifikation und zugehörige Dokumentation erstellen werden.
