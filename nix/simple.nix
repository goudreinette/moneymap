{ pkgs ? import <nixpkgs> {} }:
let

in pkgs.stdenv.mkDerivation rec {
  name =  "moneymap";


  buildCommand = ''
    mkdir -p $out
    touch $out/abc.txt
  '';
}
