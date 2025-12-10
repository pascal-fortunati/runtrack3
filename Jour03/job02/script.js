$(document).ready(function() {
    // Liste des images du puzzle
    const images = [
        'arc1.png',
        'arc2.png',
        'arc3.png',
        'arc4.png',
        'arc5.png',
        'arc6.png'
    ];

    // Crée et affiche des confettis lors de la victoire
    function creerConfettis() {
        for (let i = 0; i < 50; i++) {
            const confetti = $('<div class="confetti"></div>');
            const couleurs = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
            confetti.css({
                left: Math.random() * 100 + '%',
                top: -10 + 'px',
                background: couleurs[Math.floor(Math.random() * couleurs.length)],
                animationDelay: Math.random() * 0.5 + 's',
                animationDuration: (Math.random() * 2 + 2) + 's'
            });
            $('body').append(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // Affiche le puzzle avec les pièces mélangées
    function afficherPuzzle(listeImages) {
        $('#puzzle').empty();
        listeImages.forEach(function(img, index) {
            const piece = $('<img src="assets/img/' + img + '" data-name="' + img + '" class="piece">');
            const slot = $('<div class="slot"></div>');
            slot.append(piece);
            $('#puzzle').append(slot);
        });
        rendreDraggable();
        rendreDroppable();
    }

    // Mélange les éléments d'un tableau
    function melanger(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Affiche le puzzle mélangé au chargement
    afficherPuzzle(melanger([...images]));

    // Rend les pièces déplaçables
    function rendreDraggable() {
        $(".piece").draggable({
            revert: "invalid",
            containment: "#game-area",
            zIndex: 100,
            cursor: "move",
            start: function() {
                $(this).css('z-index', 1000);
            }
        });
    }

    // Rend les slots réceptifs au drag & drop et gère l'échange des pièces
    function rendreDroppable() {
        $(".slot").droppable({
            accept: ".piece",
            hoverClass: "slot-hover",
            drop: function(event, ui) {
                var $slotCible = $(this);
                var $pieceDrag = ui.draggable;
                var $slotOrigine = $pieceDrag.parent();
                var $anciennePiece = $slotCible.find('img');
                if ($anciennePiece.length) {
                    $slotOrigine.append($anciennePiece);
                    $anciennePiece.css({top: 0, left: 0});
                }
                $slotCible.append($pieceDrag);
                $pieceDrag.css({top: 0, left: 0});
                rendreDraggable();
                verifierOrdre();
            }
        });
    }

    // Mélange le puzzle lors du clic sur le bouton
    $('#shuffleBtn').click(function() {
        $(this).addClass('pulse');
        setTimeout(() => $(this).removeClass('pulse'), 300);
        afficherPuzzle(melanger([...images]));
        $('#result').text('');
    });

    // Vérifie si les pièces sont dans le bon ordre et affiche le résultat
    function verifierOrdre() {
        let courant = [];
        $('.slot').each(function() {
            let img = $(this).find('img');
            if (img.length) {
                courant.push(img.data('name'));
            } else {
                courant.push(null);
            }
        });
        if (courant.every(e => e !== null)) {
            if (JSON.stringify(courant) === JSON.stringify(images)) {
                $('#result')
                    .html('🎉 Vous avez gagné ! 🎉')
                    .css('color', '#4ecdc4')
                    .addClass('win-animation');
                creerConfettis();
            } else {
                $('#result').text('').removeClass('win-animation');
            }
        } else {
            $('#result').text('').removeClass('win-animation');
        }
    }
});