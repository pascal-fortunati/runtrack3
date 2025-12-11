
document.getElementById('updateBtn').addEventListener('click', updateTable);

// Fonction pour mettre à jour le tableau des utilisateurs et l'afficher
function updateTable() {
    fetch('users.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('usersTable');
            table.style.display = '';
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(user => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nom}</td>
                        <td>${user.prenom}</td>
                        <td>${user.email}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else if (data.error) {
                tbody.innerHTML = `<tr><td colspan="4">Erreur : ${data.error}</td></tr>`;
            }
        })
        .catch(error => {
            const table = document.getElementById('usersTable');
            table.style.display = '';
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = `<tr><td colspan="4">Erreur de connexion</td></tr>`;
        });
}