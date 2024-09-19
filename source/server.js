const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/compile', (req, res) => {
    const code = req.body;

    // Scrivi il codice C in un file
    fs.writeFileSync('../temp/temp.c', code);

    // Comando per compilare con Emscripten
    exec('emcc ../temp/temp.c -o public/output.js -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="createModule" -O3', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: stderr || 'Compilazione fallita.' });
        }
        res.json({ path: '/output.js' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
