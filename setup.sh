#!/bin/bash

# Controllo sui privilegi di superutente
if [ "$(id -u)" -ne "0" ]; then
  echo "Questo script deve essere eseguito come root. Esegui con 'sudo'."
  exit 1
fi

echo "Aggiornamento pacchetti..."
sudo apt install -y curl

echo "Creazione della struttura del progetto..."
mkdir -m 777 emsdk output public source temp

echo "Installazione di Node.js e npm..."
cd source 
npm init -y
apt install -y nodejs
npm install express
# npm install fs child_process path

# Verifica l'installazione di Node.js e npm
node --version
npm --version

# Clona e configura Emscripten SDK (emsdk)
echo "Installazione e configurazione di Emscripten SDK..."
cd ../emsdk
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk 
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# Verifica l'installazione di Emscripten
emcc --version

# Script completato
echo "Installazione completata. Avvio server Node.js."
cd ../source
node server.js
