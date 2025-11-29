document.addEventListener('DOMContentLoaded', function() {
    const responseDiv = document.getElementById('response');

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('regName').value,
            email: document.getElementById('regEmail').value,
            password: document.getElementById('regPassword').value,
            role: document.getElementById('regRole').value,
            department_id: document.getElementById('regDept').value || null
        };
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            responseDiv.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
            responseDiv.className = 'alert alert-success';
        } catch (err) {
            responseDiv.innerHTML = `<strong>Error:</strong> ${err.message}`;
            responseDiv.className = 'alert alert-danger';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            responseDiv.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
            responseDiv.className = 'alert alert-success';
        } catch (err) {
            responseDiv.innerHTML = `<strong>Error:</strong> ${err.message}`;
            responseDiv.className = 'alert alert-danger';
        }
    });
});
