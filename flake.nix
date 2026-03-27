{
  description = "The mise-en-place website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        packagename = "mise-en-place";
        pkgs = nixpkgs.legacyPackages.${system};
        builddeps = with pkgs; [
          nodejs_22
        ];
      in
      {
        devShell = pkgs.mkShell {
          name = packagename;
          packages = builddeps;
        };
      }
    );
}
