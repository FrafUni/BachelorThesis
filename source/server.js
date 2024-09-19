const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const tempDir = path.join(__dirname, '../temp');
const outputDir = path.join(__dirname, '../public/output');

app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/compile', (req, res) => {
    const code = req.body;

    if (!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir);
    }

    const tempFilePath = path.join(tempDir, 'temp.c');
    const outputFilePath = path.join(outputDir, 'output.js');

    fs.writeFileSync(tempFilePath, code);

    exec(`emcc ${tempFilePath} -o ${outputFilePath} -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="createModule" -O3`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: stderr || 'Compilazione fallita.' });
        }
        res.json({ path: '/output/output.js' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
