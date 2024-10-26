all:
	sphinx-build -b latex source build
	cd build && pdflatex -synctex=1 -interaction=nonstopmode Projektarbeit.tex
	evince ./build/Projektarbeit.pdf

	#clean:
		# Todo richtiges clean von Latex Dateien. d.h. Nach dem Sphinx Build liegen die Sources da
		# nach pdflatex liegt auch Müll da.
		#rm build/*.pdf
