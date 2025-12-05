// Code Konami classique : ↑ ↑ ↓ ↓ ← → ← → B A
// Tableau contenant la séquence de touches attendue
const code = [
    'ArrowUp', 'ArrowUp',        // Haut, Haut
    'ArrowDown', 'ArrowDown',    // Bas, Bas
    'ArrowLeft', 'ArrowRight',   // Gauche, Droite
    'ArrowLeft', 'ArrowRight',   // Gauche, Droite
    'b', 'a'                      // B, A
];

// Variable pour suivre la progression de l'utilisateur dans la séquence
let konami = 0;

// Écoute tous les événements de touche pressée
document.addEventListener('keydown', function(event) {
    // Récupère la touche pressée en minuscule pour la comparaison
    const key = event.key.toLowerCase();
    // Récupère la touche attendue à la position actuelle dans la séquence
    const expectedKey = code[konami].toLowerCase();
    
    // Vérifie si la touche pressée correspond à la touche attendue
    if (key === expectedKey || event.key === code[konami]) {
        // Bonne touche : on avance dans la séquence
        konami++;
        
        // Si on a complété toute la séquence
        if (konami === code.length) {
            // Active le style Konami en ajoutant la classe CSS
            document.body.classList.add('konami');
            // Réinitialise l'index pour permettre de recommencer
            konami = 0;
        }
    } else {
        // Mauvaise touche : on réinitialise tout et on recommence depuis le début
        konami = 0;
    }
});