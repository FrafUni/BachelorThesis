# BachelorThesis
Compiler of C code on a browser

## Installazione
ATTENZIONE!  
Non clonare questo git altrimenti l'installazione di Emscripten non andrà a buon fine

## Installazione Node JS
è importante riavviare il terminale dopo aver eseguito il primo comando:  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash  
// Riavviare terminale  

nvm install 20	 
node -v  
npm -v   

## Installazione Emscripten
cd emsdk  
git clone https://github.com/emscripten-core/emsdk.git  
cd emsdk  
./emsdk install latest  
./emsdk activate latest  
source ./emsdk_env.sh

## Installazione Express e inizializzazoine progetto Node JS
npm init -y  
npm install express

## Avvio server 
node /source/server.js
