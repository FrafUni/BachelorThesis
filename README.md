# BachelorThesis
Compiler of C code on a browser
L'output è visualizzabile nella Console del browser

## Installazione tramite setup.sh
è possibile eseguire il file setup.sh per configurare l'ambiente di sviluppo, altrimenti proceedere manualmente seguendo questo file  

## Comandi per eseguire il setup automatico  
ATTENZIONE! è importante eseguire il file di setup con source  
chmod +x setup.sh  
source ./setup.sh  


# Installazione manuale
è importante riavviare il terminale dopo aver eseguito il primo comando:  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash  
exit  

// Terminale riavviato  
nvm install 20	  

## Installazione Emscripten
git clone https://github.com/emscripten-core/emsdk.git  
cd emsdk  
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
