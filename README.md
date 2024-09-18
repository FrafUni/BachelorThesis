# BachelorThesis
Compiler of C code on a browser

# Installazione tramite setup.sh
è possibile eseguire il file setup.sh per configurare l'ambiente di sviluppo, altrimenti proceedere manualmente seguendo questo file  
chmod +x setup.sh  
./setup.sh  


## Installazione Node JS
è importante riavviare il terminale dopo aver eseguito il primo comando:  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash  
exit  

// Terminale riavviato  
nvm install 20	  

## Installazione Emscripten
cd emsdk  
git clone https://github.com/emscripten-core/emsdk.git  
./emsdk install latest  
./emsdk activate latest  
source ./emsdk_env.sh  
cd ..

## Installazione Express e inizializzazoine progetto Node JS
npm init -y  
npm install express

## Avvio server 
Una volta inseriti i file consultabili attraverso questo repository GitHub è possibile avviare il server e testare il progetto visitando la pagina http://localhost:3000  
node source/server.js
