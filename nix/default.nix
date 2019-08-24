{ pkgs ? import <nixpkgs> {}
}:

let
  nodePkg = (
      import ./node2nix/default.nix { inherit pkgs; }
    ).package;

in pkgs.stdenv.mkDerivation rec {
  name = "moneymap";
  src = pkgs.lib.cleanSource ./..;

  buildInputs = with pkgs.elmPackages; [
    elm
    # elm-format
    nodePkg
    pkgs.nodejs-8_x
  ];

  patchPhase = ''
    # Link `node_modules`
    rm -rf node_modules
    ln -sf ${nodePkg}/lib/node_modules/${name}/node_modules .

    # Create `.elm`
    rm -rf elm-stuff
    ${pkgs.elmPackages.fetchElmDeps {
      elmPackages = import ./elm2nix/elm-srcs.nix;
      versionsDat = ./elm2nix/versions.dat;
    }}
  '';

  installPhase = ''
    mkdir -p $out
    cp -r dist $out
  '';

  shellHook = patchPhase;
}
