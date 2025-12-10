document.getElementById('filtrer').addEventListener('click', function() {
    const nom = document.getElementById('nom').value.trim().toLowerCase();
    const type = document.getElementById('type').value;

    fetch('pokemon.json')
        .then(response => response.json())
        .then(data => {
            let result = data.filter(pokemon => {
                let match = true;
                if (nom) {
                    const names = Object.values(pokemon.name).map(n => n.toString().toLowerCase());
                    if (!names.some(n => n.includes(nom))) match = false;
                }
                if (type && !pokemon.type.map(t => t.toLowerCase()).includes(type.toLowerCase())) match = false;
                return match;
            });
            displayResult(result);
        });
});

function displayResult(pokemons) {
    const resultDiv = document.getElementById('result');
    if (pokemons.length === 0) {
        resultDiv.innerHTML = '<em>Aucun Pokémon trouvé.</em>';
        return;
    }
    resultDiv.innerHTML = pokemons.map(p =>
        `<div class="pokemon"><strong>#${p.id}</strong> ${p.name.french} (${p.type.join(', ')})</div>`
    ).join('');
}
