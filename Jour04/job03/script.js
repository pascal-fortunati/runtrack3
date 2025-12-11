const grid = document.getElementById('grid');
const search = document.getElementById('search');
let allPokemon = [];
let currentPage = 1;
const pageSize = 30;
let totalPokemon = 1328;

// Création des boutons de pagination
const paginationDiv = document.createElement('div');
paginationDiv.style.textAlign = 'center';
paginationDiv.style.margin = '30px 0';
paginationDiv.innerHTML = `
    <button id="prevBtn">Précédent</button>
    <span id="pageInfo"></span>
    <button id="nextBtn">Suivant</button>
`;
grid.parentNode.appendChild(paginationDiv);
const prevBtn = paginationDiv.querySelector('#prevBtn');
const nextBtn = paginationDiv.querySelector('#nextBtn');
const pageInfo = paginationDiv.querySelector('#pageInfo');

// Récupère la liste des Pokémon avec pagination
async function fetchPokemonList(page = 1) {
    const offset = (page - 1) * pageSize;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
    const data = await res.json();
    totalPokemon = data.count;
    return data.results;
}

// Récupère les détails d'un Pokémon, y compris son nom et types en français
async function fetchPokemonDetails(url) {
    const res = await fetch(url);
    const data = await res.json();
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const frNameObj = speciesData.names.find(n => n.language.name === 'fr');
    data.frName = frNameObj ? frNameObj.name : capitalize(data.name);
    data.frTypes = [];
    for (const t of data.types) {
        const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${t.type.name}`);
        const typeData = await typeRes.json();
        const frTypeObj = typeData.names.find(n => n.language.name === 'fr');
        data.frTypes.push(frTypeObj ? frTypeObj.name : capitalize(t.type.name));
    }
    // Ajoute les noms français des stats
    data.frStats = [];
    for (const s of data.stats) {
        const statRes = await fetch(`https://pokeapi.co/api/v2/stat/${s.stat.name}`);
        const statData = await statRes.json();
        const frStatObj = statData.names.find(n => n.language.name === 'fr');
        data.frStats.push(frStatObj ? frStatObj.name : capitalize(s.stat.name));
    }
    // Ajoute les noms français des attaques (moves)
    data.frMoves = [];
    // On limite à 4 attaques max pour l'affichage
    for (let i = 0; i < Math.min(4, data.moves.length); i++) {
        const move = data.moves[i];
        const moveRes = await fetch(move.move.url);
        const moveData = await moveRes.json();
        const frMoveObj = moveData.names.find(n => n.language.name === 'fr');
        // Récupère la description française
        let frDesc = '';
        if (moveData.flavor_text_entries) {
            const frFlavor = moveData.flavor_text_entries.find(e => e.language.name === 'fr');
            frDesc = frFlavor ? frFlavor.flavor_text.replace(/\f/g, ' ') : '';
        }
        data.frMoves.push({
            name: frMoveObj ? frMoveObj.name : capitalize(move.move.name),
            desc: frDesc
        });
    }
    return data;
}

// Affiche un loader pendant le chargement des données
function showLoader() {
    grid.innerHTML = '<div class="loader">Chargement des Pokémon...</div>';
}

// Charge et affiche tous les Pokémon avec pagination
async function loadAllPokemon(page = 1) {
    showLoader();
    pageInfo.textContent = `Page ${page} / ${Math.ceil(totalPokemon / pageSize)}`;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= Math.ceil(totalPokemon / pageSize);
    const list = await fetchPokemonList(page);
    const promises = list.map(p => fetchPokemonDetails(p.url));
    allPokemon = await Promise.all(promises);
    renderPokemon(allPokemon);
}

// Rend les cartes de Pokémon dans la grille
function renderPokemon(pokemons) {
    grid.innerHTML = pokemons.map((p, idx) => {
        // Récupère les deux types principaux, sans accent
        const type1 = p.frTypes[0].toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[’']/g, '').replace(/é/g, 'e');
        const type2 = p.frTypes[1] ? p.frTypes[1].toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[’']/g, '').replace(/é/g, 'e') : null;

        // Dictionnaire des couleurs pour les gradients
        const typeColors = {
            feu: '#ff9800',
            eau: '#2196f3',
            plante: '#43ea7f',
            electrik: '#ffe600',
            psy: '#f06292',
            glace: '#81d4fa',
            dragon: '#7e57c2',
            tenebres: '#616161',
            fee: '#f8bbd0',
            normal: '#e0e0e0',
            combat: '#e57373',
            vol: '#90caf9',
            poison: '#ba68c8',
            sol: '#ffe082',
            roche: '#bcaaa4',
            insecte: '#d4e157',
            spectre: '#9575cd',
            acier: '#b0bec5'
        };

        // Crée le gradient dynamique
        let cardGradient;
        if (type2 && typeColors[type2]) {
            cardGradient = `linear-gradient(135deg, ${typeColors[type1]} 0%, ${typeColors[type2]} 100%)`;
        } else {
            cardGradient = `linear-gradient(135deg, #fff 0%, ${typeColors[type1] || '#fff'} 100%)`;
        }

        return `
        <div class="card" data-idx="${idx}" data-type="${type1}" style="--card-gradient:${cardGradient};">
            <div class="card-inner">
                <!-- FACE AVANT -->
                <div class="card-front">
                    <button class="sound-btn" title="Jouer le cri du Pokémon" data-pokeid="${p.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                    <img class="poke-img" src="${p.sprites.other['official-artwork'].front_default || p.sprites.front_default}" alt="${p.frName}">
                    <div class="poke-name">
                        <span class="poke-id">#${p.id}</span> ${p.frName}
                    </div>
                    <div class="types">
                        ${p.frTypes.map(type => `<span class="type" data-type="${type.toLowerCase()}">${type}</span>`).join('')}
                    </div>
                    <div class="moves-compact">
                        <div class="move-tooltip"></div>
                        <div class="moves-title">Les attaques</div>
                        ${p.frMoves && p.frMoves.length ? `
                            <div class="moves-list">
                                ${p.frMoves.slice(0, 4).map(m => `
                                    <div class="move-item">
                                        <span class="move-name">${m.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                            ${p.frMoves.length > 4 ? `<div class="moves-more">+${p.frMoves.length - 4} autres</div>` : ''}
                        ` : '<div class="moves-none">Aucune capacité</div>'}
                    </div>
                </div>
                <!-- FACE ARRIÈRE -->
                <div class="card-back">
                    <div class="back-header">
                        <img class="poke-img" src="${p.sprites.other['official-artwork'].front_default || p.sprites.front_default}" alt="${p.frName}">
                    </div>
                    <div class="back-meta">
                        <span title="Taille">📏 ${p.height / 10} m</span>
                        <span title="Poids">⚖️ ${p.weight / 10} kg</span>
                        <span title="XP">⭐ ${p.base_experience}</span>
                    </div>
                    <div class="back-stats">
                        ${p.stats.map((s, i) => `
                            <div class="stat">
                                <span class="stat-name">${p.frStats && p.frStats[i] ? p.frStats[i] : capitalize(s.stat.name)}</span>
                                <div class="stat-bar" style="--value:${s.base_stat}"></div>
                                <span class="stat-value">${s.base_stat}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        // Gestion de la tooltip unique par carte
        const movesCompact = card.querySelector('.moves-compact');
        const tooltip = movesCompact.querySelector('.move-tooltip');
        card.querySelectorAll('.move-item').forEach((item, i) => {
            item.addEventListener('mouseenter', () => {
                const moveName = item.querySelector('.move-name').textContent;
                const moveDesc = pokemons[card.dataset.idx].frMoves[i].desc || 'Aucune description.';
                tooltip.innerHTML = `<strong>${moveName}</strong><br>${moveDesc}`;
                tooltip.style.display = 'block';
                tooltip.style.opacity = '1';
            });
            item.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '';
                tooltip.innerHTML = '';
            });
        });
        // Gestion du son du Pokémon
        const soundBtn = card.querySelector('.sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pokeId = soundBtn.getAttribute('data-pokeid');
                const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeId}.ogg`;
                let audio = soundBtn._audio;
                if (!audio) {
                    audio = new Audio(audioUrl);
                    soundBtn._audio = audio;
                } else {
                    audio.currentTime = 0;
                }
                audio.play();
            });
        }
    });
}

// Filtre les Pokémon en fonction de la recherche
search.addEventListener('input', function() {
    const val = search.value.trim().toLowerCase();
    let filtered = allPokemon.filter(p => {
        return p.name.includes(val) || String(p.id).includes(val);
    });
    // Si rien trouvé et recherche non vide, tente via l'API
    if (filtered.length === 0 && val.length > 0) {
        paginationDiv.style.display = 'none';
        let apiUrl = null;
        if (/^\d+$/.test(val)) {
            // Recherche par id
            apiUrl = `https://pokeapi.co/api/v2/pokemon/${val}`;
        } else {
            // Recherche par nom
            apiUrl = `https://pokeapi.co/api/v2/pokemon/${val}`;
        }
        showLoader();
        fetchPokemonDetails(apiUrl)
            .then(poke => renderPokemon([poke]))
            .catch(() => {
                grid.innerHTML = '<div class="loader">Aucun Pokémon trouvé.</div>';
            });
        return;
    }
    // Si la recherche est vide, on réaffiche la pagination
    if (val.length === 0) {
        paginationDiv.style.display = '';
    } else {
        paginationDiv.style.display = 'none';
    }
    renderPokemon(filtered);
});

// Capitalise la première lettre d'une chaîne
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Gestion des boutons de pagination
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadAllPokemon(currentPage);
    }
});
nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(totalPokemon / pageSize)) {
        currentPage++;
        loadAllPokemon(currentPage);
    }
});

// Chargement initial des Pokémon
loadAllPokemon(currentPage);