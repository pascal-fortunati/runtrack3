// Code Konami classique : ↑ ↑ ↓ ↓ ← → ← → B A
const code = [
    'ArrowUp', 'ArrowUp',        // Haut, Haut
    'ArrowDown', 'ArrowDown',    // Bas, Bas
    'ArrowLeft', 'ArrowRight',   // Gauche, Droite
    'ArrowLeft', 'ArrowRight',   // Gauche, Droite
    'b', 'a'                      // B, A
];

// Variable pour suivre la progression de l'utilisateur dans la séquence
let konami = 0;

// Récupère le conteneur d'affichage des touches
const keysDisplay = document.getElementById('keys-display');

// Fonction pour convertir les codes de touches en symboles visuels
function getKeySymbol(key) {
    const symbols = {
        'ArrowUp': '↑',
        'ArrowDown': '↓',
        'ArrowLeft': '←',
        'ArrowRight': '→'
    };
    return symbols[key] || key.toUpperCase();
}

// Fonction pour ajouter une touche à l'affichage
function addKeyToDisplay(key, isValid = false) {
    // Crée un élément div pour la touche
    const keyElement = document.createElement('div');
    keyElement.className = 'key' + (isValid ? ' valid' : ' error');
    
    // Ajoute la classe 'arrow' si c'est une flèche
    if (key.startsWith('Arrow')) {
        keyElement.classList.add('arrow');
    }
    
    // Affiche le symbole de la touche
    keyElement.textContent = getKeySymbol(key);
    
    // Ajoute la touche au conteneur
    keysDisplay.appendChild(keyElement);
    
    // Limite l'affichage aux 10 dernières touches
    if (keysDisplay.children.length > 10) {
        keysDisplay.removeChild(keysDisplay.firstChild);
    }
}

// Fonction pour effacer toutes les touches affichées
function clearKeysDisplay() {
    keysDisplay.innerHTML = '';
}

// Écoute tous les événements de touche pressée
document.addEventListener('keydown', function(e) {
    console.log(e.key);
    // Récupère la touche pressée en minuscule pour la comparaison
    const key = e.key.toLowerCase();
    // Récupère la touche attendue à la position actuelle dans la séquence
    const expectedKey = code[konami].toLowerCase();
    
    // Vérifie si la touche pressée correspond à la touche attendue
    if (key === expectedKey || e.key === code[konami]) {
        // Bonne touche : on avance dans la séquence
        konami++;
        
        // Affiche la touche avec effet de validation (vert)
        addKeyToDisplay(e.key.startsWith('Arrow') ? e.key : e.key, true);
        
        // Si on a complété toute la séquence
        if (konami === code.length) {
            // Efface immédiatement l'affichage des touches
            clearKeysDisplay();
            
            // Active le style Konami en ajoutant la classe CSS
            document.body.classList.add('konami');
            
            // Réinitialise l'index
            konami = 0;
        }
    } else {
        // Affiche la touche en rouge (erreur)
        addKeyToDisplay(e.key.startsWith('Arrow') ? e.key : e.key, false);
        
        // Mauvaise touche : on réinitialise tout après un court délai
        setTimeout(() => {
            clearKeysDisplay();
            konami = 0;
        }, 500);
    }
});