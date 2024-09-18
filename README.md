# BachelorThesis
Compiler of C code on a browser

# Installazione
Una volta clonato il git è necessario installare tutte le dipendenze necessarie eseguendo i seguenti comandi:

# Installazione Node JS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20	 
node -v 
npm -v  

# installazione Emscripten
cd ../emsdk
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk 
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# installazione Express e inizializzazoine progetto Node JS
npm init -y  
npm install express
