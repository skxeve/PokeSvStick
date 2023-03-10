
build:
	cd poke_sv_stick && npm run build
	git rm -rf docs
	mv poke_sv_stick/dist docs
	git add docs
