// Fonction pour extraire la valeur d'une clé depuis une chaîne JSON
function jsonValueKey(jsonString, key) {
    try {
        // Remplacer les clés non-quotées par des clés quotées (pour l'exemple fourni)
        const fixedJson = jsonString.replace(/([\w]+)\s*:/g, '"$1":');
        const obj = JSON.parse(fixedJson);
        return obj[key];
    } catch (e) {
        console.error('JSON invalide :', e);
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

