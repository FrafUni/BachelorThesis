document.getElementById('compileBtn').addEventListener('click', async () => {
    const code = document.getElementById('code').value;
    const response = await fetch('/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });

    const outputDiv = document.getElementById('output');
    outputDiv.innerText = ''; // Pulisce l'output precedente

    if (response.ok) {
        const message = await response.text();
        outputDiv.innerText = message; // Mostra l'output dell'esecuzione
    } else {
        const errorText = await response.text();
        outputDiv.innerText = `Errore: ${errorText}`; // Mostra l'errore se presente
    }
});
