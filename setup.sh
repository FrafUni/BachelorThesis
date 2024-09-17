#!/bin/bash

# Controllo sui privilegi di superutente
if [ "$(id -u)" -ne "0" ]; then
  echo "Questo script deve essere eseguito come root. Esegui con 'sudo'."
  exit 1
fi

echo "Aggiornamento pacchetti..."
apt update -y
apt upgrade -y
apt install -y curl git

echo "Creazione della struttura del progetto..."
mkdir -p emsdk output public source temp

echo "Installazione di Node.js e npm..."
cd source || exit
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Verifica l'installazione di Node.js e npm
node --version
npm --version

echo "Inizializzazione del progetto Node.js e installazione di Express..."
npm init -y
npm install express

# Installa altre dipendenze per la gestione di filesystem e processi
npm install fs child_process path

# Clona e configura Emscripten SDK (emsdk)
echo "Installazione e configurazione di Emscripten SDK..."
cd ../emsdk || exit
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk || exit
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# Verifica l'installazione di Emscripten
emcc --version

cd ../..

# Script completato
echo "Installazione completata. Ora puoi avviare il server Node.js."
