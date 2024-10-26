- Im Ordner doc den Ordner spihinx mit virtualenv anlegen
$ virtualenv -p /usr/bin/python3.5 sphinx

- Datei .envrc mit dem Inhalt anlegen. Automatisches laden von direnv
layout python3

- In den Ordner über Terminal wechseln mit `cd` und
$ direnv allow
$ pip install sphinx
$ sphinx-build --version

- Aus dem Ordner sphinx aurfrufen
$ sphinx-build -b latex ../source/ ../build/latex

- Für Texstudio und Latex generierung
$ sudo apt install texlive-full


## Wie für seminar
- Terminal geöffnet. Befinde mich im Ordner `client`
	- lege die datei an mit Inhalt `echo "layout python3"  > doc/.envrc`
	- lege Gitignore an mit Inhalt `echo "doc/.direnv" > .gitignore`
- wechsle in das `doc` Verzeichnis
	- installiere Sphinx `pip install sphinx`
	- lege Ordnerstruktur mit `sphinx-quickstart` an.
	- Auf Fragen antworten **source und build separiert!**
	- baue das Dokument `sphinx-build -b latex source build`
	- verfollständige im `client` (anhängen) Gitignore`echo -e "\ndoc/build\ndoc/source/_static\ndoc/source/_templates" >> .gitignore`

## pdf bauen
- wechsle in Verzeichnis build
	pdflatex -synctex=1 -interaction=nonstopmode Projektarbeit.tex && evince Projektarbeit.pdf
- Alles in ein Makefile übertragen

Problem mit img/.pdf Dateien die den Minuszeichen im Dateinamen enthalten. Übergegangen zu unterstrich.

## Screen Capture von Android direkt in den Ordner auf Linux rechner

- Androidgerät über usb anschliessen
- Konsole im gewünschtem Ordner öffnen
- `adb shell screencap -p | sed 's/\r$//' > screen.png`
