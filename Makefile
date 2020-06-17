lint:
	npx eslint .

link:
	npm link

install:
	npm install

test:
	npx -n --experimental-vm-modules jest

publish:
	npm publish --dry-run

run:
	node ./gendiff.js