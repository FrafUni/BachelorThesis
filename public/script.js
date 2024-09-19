document.getElementById('compileBtn').addEventListener('click', () => {
    const code = document.getElementById('code').value;

    fetch('/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: code,
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
    })
    .then(data => {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Pulisci il div precedente

        // Carica il file JavaScript generato
        const script = document.createElement('script');
        script.src = data.path;
        script.onload = () => {
            createModule().then(Module => {
                // Esegui il codice compilato
                Module.onRuntimeInitialized = () => {
                    Module._main(); // Chiama main
                };
            });
        };
        document.body.appendChild(script);
    })
    .catch(error => {
        document.getElementById('output').innerText = error.message;
    });
});
