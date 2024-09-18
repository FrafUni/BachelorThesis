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
    outputDiv.innerText = ''; 

    if (response.ok) {
        const message = await response.text();
        outputDiv.innerText = message; 
    } else {
        const errorText = await response.text();
        outputDiv.innerText = `Errore: ${errorText}`;
    }
});
