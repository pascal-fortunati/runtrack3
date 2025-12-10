// Variables globales
let images = [];
let plateau = [];
let bloque = false;
let morceauxUpload = [];
let jeuxDisponibles = {};
let jeuActif = null;

// Initialisation du jeu à la fin du chargement du document
$(document).ready(function() {
    chargerJeuxDisponibles();
    $('#restart').on('click', initialiserJeu);
    $('#uploadForm').on('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(msg) {
                    afficherFlashMessage(msg);
                chargerJeuxDisponibles();
            }
        });
    });
});

// Charge les jeux disponibles depuis le fichier JSON
function chargerJeuxDisponibles() {
    $.getJSON('data/jeux.json', function(data) {
        jeuxDisponibles = data;
        afficherSelectJeux();
    });
}

// Affiche le menu de sélection des jeux
function afficherSelectJeux() {
    let $selectJeu = $('#selectJeu');
    $selectJeu.empty();
    $.each(jeuxDisponibles, function(jeu, morceaux) {
        $selectJeu.append($('<option>', { value: jeu, text: jeu }));
    });
    $selectJeu.off('change').on('change', function() {
        jeuActif = $(this).val();
        chargerMorceauxJeu(jeuActif);
    });
    if ($selectJeu.children().length > 0) {
        jeuActif = $selectJeu.val();
        chargerMorceauxJeu(jeuActif);
    }
}

// Affiche un message flash
function afficherFlashMessage(message) {
    let $flash = $('#flash-message');
    if ($flash.length === 0) {
        $flash = $('<div id="flash-message"></div>');
        $('body').append($flash);
    }
    $flash.text(message).fadeIn().css({
        display: 'block'
    });
    setTimeout(function() {
        $flash.fadeOut();
    }, 2500);
}

// Charge les morceaux du jeu sélectionné
function chargerMorceauxJeu(jeu) {
    morceauxUpload = jeuxDisponibles[jeu] || [];
    initialiserJeu();
}

// Initialise le jeu
function initialiserJeu() {
    if (morceauxUpload.length === 8 || morceauxUpload.length === 9) {
        images = [...morceauxUpload];
        if (images.length === 8) images.push(null);
        plateau = melangerTableau(images);
        bloque = false;
        afficherPlateau();
        $('#win').hide();
        $('#restart').hide();
    } else {
        $('#taquin').html('<div style="color:white;font-size:1.2em;padding:40px;">Veuillez uploader une image pour jouer !</div>');
        $('#win').hide();
        $('#restart').hide();
    }
}

// Affiche le plateau de jeu
function afficherPlateau() {
    let $taquin = $('#taquin');
    $taquin.empty();
    $.each(plateau, function(i, img) {
        let $tuile = $('<div>').addClass('tile' + (img === null ? ' empty' : '')).attr('data-index', i);
        if (img) {
            let $image = $('<img>').attr('src', img).attr('alt', 'Morceau du taquin');
            $tuile.append($image);
        }
        $tuile.on('click', function() { deplacerTuile(i); });
        $taquin.append($tuile);
    });
}

// Mélange le tableau
function melangerTableau(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Déplace une tuile si possible
function deplacerTuile(index) {
    if (bloque) return;
    const vide = plateau.indexOf(null);
    const voisins = [
        vide - 1, vide + 1,
        vide - 3, vide + 3
    ];
    if (voisins.includes(index) &&
        ((index % 3 === vide % 3) || (Math.floor(index / 3) === Math.floor(vide / 3)))) {
        [plateau[vide], plateau[index]] = [plateau[index], plateau[vide]];
        afficherPlateau();
        verifierVictoire();
    }
}

// Vérifie si le joueur a gagné
function verifierVictoire() {
    for (let i = 0; i < images.length; i++) {
        if (plateau[i] !== images[i]) return;
    }
    bloque = true;
    $('#win').show();
    $('#restart').show();
}