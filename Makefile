lint:
	npx eslint .

install:
	npm install

publish:
	npm publish --dry-run

run:
	node ./gendiff.js