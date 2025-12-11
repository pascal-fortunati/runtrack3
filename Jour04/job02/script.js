// Fonction pour extraire la valeur associée à une clé dans une chaîne JSON
function jsonValueKey(jsonString, key) {
    try {
        const obj = JSON.parse(jsonString);
        return obj[key];
    } catch (e) {
        return undefined;
    }
}

// Ajout de l'interaction avec la page
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('searchBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            const jsonStr = document.getElementById('jsonStr').textContent;
            const key = document.getElementById('key').value;
            const value = jsonValueKey(jsonStr, key);
            document.getElementById('result').textContent = value !== undefined ? value : 'Clé non trouvée ou JSON invalide';
        });
    }
});
