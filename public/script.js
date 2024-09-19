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
        const script = document.createElement('script');
        script.src = data.path;
        script.onload = () => {
            createModule().then(Module => {
                Module.onRuntimeInitialized = () => {
                    Module._main(); 
                };
            });
        };
        document.body.appendChild(script); 
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
});
