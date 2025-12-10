async function fetchData() {
    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Erreur' + response.statusText);
        }
        const data = await response.json();
        const userList = document.getElementById('result');
        userList.innerHTML = '';
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Prenom: ${user.nom} Age: ${user.age} - ${user.email}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Il y a eu un problème avec votre opération de récupération :', error);
    }
}

const fetchButton = document.getElementById('fetchButton');
if (fetchButton) {
    fetchButton.addEventListener('click', fetchData);
}