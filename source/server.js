const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Endpoint per compilare il codice C
app.post('/compile', (req, res) => {
    const code = req.body.code;
    const cFilePath = path.join(__dirname, 'temp', 'temp.c');
    const jsFilePath = path.join(__dirname, 'temp', 'temp.js');

    // Salva il codice C in un file temporaneo
    fs.writeFileSync(cFilePath, code);

    // Esegui emcc per compilare il codice C in WebAssembly
    exec(`emcc ${cFilePath} -o ${jsFilePath} -s WASM=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore di compilazione: ${stderr}`);
            return res.status(500).send(`Errore di compilazione: ${stderr}`);
        }

        // Esegui il file JavaScript generato per ottenere l'output
        exec(`node ${jsFilePath}`, (execError, execStdout, execStderr) => {
            if (execError) {
                console.error(`Errore di esecuzione: ${execStderr}`);
                return res.status(500).send(`Errore di esecuzione: ${execStderr}`);
            }

            // Ritorna l'output dell'esecuzione
            res.send(execStdout.trim());
        });
    });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
