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
        // Carica il file di output compilato
        const script = document.createElement('script');
        script.src = data.path;
        script.onload = () => {
            createModule().then(Module => {
                Module.onRuntimeInitialized = () => {
                    Module._main(); // Esegui il programma C compilato
                };
            });
        };
        document.body.appendChild(script); // Aggiungi lo script al DOM
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
});
