#!/bin/bash

# Installazione Node JS
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm use --install-if-missing 20
node -v
npm -v

# Installazione Emscripten
git clone https://github.com/emscripten-core/emsdk.git  
./emsdk/emsdk install latest  

# Installazione Express e inizializzazoine progetto Node JS
cd source
npm init -y   
npm install express  
cd ..

# Attivazione Emscripten  
./emsdk/emsdk activate latest  
source ./emsdk/emsdk_env.sh  

# Avvio server  
node source/server.js
