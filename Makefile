lint:
	npx eslint .

link:
	npm link

install:
	npm install

test:
	npx -n --experimental-vm-modules jest

watch:
	npx jest --watch

publish:
	npm publish --dry-run

run:
	node ./gendiff.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test