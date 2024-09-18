#!/bin/bash

# Installazione Node JS
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm use --install-if-missing 20
node -v
npm -v

# Installazione Emscripten
git clone https://github.com/emscripten-core/emsdk.git  
cd emsdk
./emsdk install latest  
./emsdk activate latest  
source ./emsdk_env.sh  
cd ..

# Installazione Express e inizializzazoine progetto Node JS
npm init -y  
npm install express

# Avvio server 
node source/server.js
