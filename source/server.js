const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware per gestire i file statici
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Percorsi per le cartelle "output" e "temp" a livello superiore rispetto a "source"
const outputDir = path.join(__dirname, '../output');
const tempDir = path.join(__dirname, '../temp');

// Funzione per creare le cartelle "output" e "temp" se non esistono
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

app.post('/compile', (req, res) => {
    const { code } = req.body;

    // Salva il codice C in un file temporaneo nella cartella "temp"
    const codeFilePath = path.join(tempDir, 'temp.c');
    fs.writeFileSync(codeFilePath, code);

    // Percorsi per i file di output nella cartella "output"
    const jsOutputPath = path.join(outputDir, 'a.out.js');
    const wasmOutputPath = path.join(outputDir, 'a.out.wasm');

    // Comando per compilare il codice C con Emscripten
    const command = `emcc ${codeFilePath} -o ${jsOutputPath} -s WASM=1 -s EXPORTED_FUNCTIONS="['_main']" -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('Errore nella compilazione: ' + stderr);
        }

        // Esegui il file JS generato e cattura l'output
        const runCommand = `node ${jsOutputPath}`;
        exec(runCommand, (runError, runStdout, runStderr) => {
            if (runError) {
                return res.status(500).send('Errore durante l\'esecuzione: ' + runStderr);
            }

            // Restituisci l'output dell'esecuzione
            res.send(runStdout);
        });
    });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
