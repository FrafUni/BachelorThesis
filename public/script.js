document.getElementById('compileBtn').addEventListener('click', async () => {
        const code = document.getElementById('code').value;
        const outputDiv = document.getElementById('output');
        outputDiv.textContent = 'Compilazione in corso...';

        try {
            const response = await fetch('/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Errore nella compilazione');
            }

            const result = await response.text();
            outputDiv.innerHTML = result;
        } catch (error) {
            outputDiv.textContent = 'Errore: ' + error.message;
        }

});
