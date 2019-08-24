ENTRY=html/index.html

# TODO: Avoid npx


# Production build
build:
	npx parcel build $(ENTRY)

# Install dependencies
install:
	npm install

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

# Run the test suite in watch mode
test_watch:
	npx watch 'make test' elm/src elm/tests/Tests

# Generate typescript types from elm ports
gen-ts:
	npx elm-typescript-interop

# TODO: Add description
format:
        # TODO: Remove duplication
	npx prettier --write 'elm/**/*.+(json|elm)'
	npx prettier --write 'ts/**/*.+(json|ts)'
	npx prettier --write 'html/**/*.html'

# Checks if code is formatted correctly
check_format:
        # TODO: Remove duplication
	npx prettier 'elm/**/*.+(json|elm)'
	npx prettier 'ts/**/*.+(json|ts)'
	npx prettier 'html/**/*.html'

# TODO: Add description
clean:
	rm -rf node_modules
	rm -rf elm/elm-stuff

# Generate Nix expressions for CI and deployment
nix: clean
	cd nix/node2nix; \
	node2nix --nodejs-8 \
	         --lock ../../package-lock.json \
	         --input ../../package.json

        # Unfortunately `elm2nix` is not yet distributed via NPM
	cd elm; \
	elm2nix convert > ../nix/elm2nix/elm-srcs.nix; \
	elm2nix snapshot > ./versions.dat; mv ./versions.dat ../nix/elm2nix/versions.dat # TODO: Remove this hack

# Product build using Nix
build_nix:
	nix-build nix/default.nix

check: check_format test
