ENTRY=html/index.html

# Install dependencies
install:
	npm install

# Production build
build:
	npx parcel build $(ENTRY)

# Hot reloading development
dev:
	npx parcel $(ENTRY) &

# Serve module docs
docs:
	npx -c 'cd elm; elm-doc-preview --no-browser'

# Run the test suite
test:
	npx -c 'cd elm; elm-verify-examples'
	npx -c 'cd elm; elm-test'

# Run the TypeScript test suite
test-ts:
	npx mocha 'ts/tests/**' --require ts-node/register

# Scrape data from `opensecrets.org`
scrape:
	OUT_FILE=data/opensecrets.json npx ts-node ts/scr/Scraper/index.ts

# Run the test suite in watch mode
test_watch:
	npx watch 'make test' elm/src elm/tests/Tests

# Generate typescript types from elm ports
gen-ts:
	npx elm-typescript-interop

format:
	npx prettier --write 'elm/**/*.json'
	npx prettier --write 'ts/**/*.+(json|ts)'
	npx prettier --write 'html/**/*.html'

clean:
	rm -rf node_modules
	rm -rf elm/elm-stuff
