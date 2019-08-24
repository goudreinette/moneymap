TMP=$(mktemp -d)

JQ_EXPR='del(.dependencies["elm-format", "elm-test", "elmi-to-json", "elm-verify-examples"])'

jq "$JQ_EXPR" package.json > $TMP/package.json
jq "$JQ_EXPR" package-lock.json > $TMP/package-lock.json

node2nix --nodejs-8 \
	 --lock $TMP/package-lock.json \
	 --input $TMP/package.json \
         --composition nix/node2nix/default.nix \
         --output nix/node2nix/node-packages.nix \
         --node-env nix/node2nix/node-env.nix
