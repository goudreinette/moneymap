{ pkgs ? import <nixpkgs> {} }:
let
  nodePkg = (
      import ./node2nix/default.nix { inherit pkgs; }
    ).package;

  # TODO: Remove, once they're on nixos stable channel
  elmTools = import (pkgs.fetchFromGitHub {
    owner = "turboMaCk";
    repo = "nix-elm-tools";
    rev = "41b5045587f84d993a7ee55972cfd61152cafc48";
    sha256 = "1ns02xxj3zijf6myaxk8azgs8v69gpc2b0v080m2xjf1pvv6hd75";
  }) { inherit pkgs; };

in pkgs.stdenv.mkDerivation rec {
  name =  "moneymap";

  src = pkgs.lib.cleanSource ./..;

  doCheck = true;

  buildInputs = with pkgs.elmPackages; [
    elm
    elm-format
    elmTools.elm-verify-examples
    elmTools.elm-test
  ];


  patchPhase = ''
    echo 1
  '';

  installPhase = ''
    mkdir -p $out
    cp -r dist/* $out
  '';


  installPhase = ''
    mkdir -p $out
    touch $out/abc.txt
  '';

}
