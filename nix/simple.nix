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


  buildCommand = ''
    mkdir -p $out
    touch $out/abc.txt
  '';
}
