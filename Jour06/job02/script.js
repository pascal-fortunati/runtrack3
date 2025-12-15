$(document).ready(function() {
const bladeRunnerQuotes = [
    "J'ai vu tant de choses, que vous, humains, ne pourriez pas croire... De grands navires en feu surgissant de l'épaule d'Orion, j'ai vu des rayons fabuleux, des rayons C, briller dans l'ombre de la Porte de Tannhaüser. Tous ces moments se perdront dans l'oubli, comme les larmes dans la pluie. Il est temps de mourir.",
    "Tous ces moments se perdront dans l'oubli, comme des larmes dans la pluie.",
    "T'endors pas, c'est l'heure de mourir.",
    "Avez-vous déjà désactivé un humain par erreur ?",
    "C'est dommage qu'elle doive mourir, mais on en est tous là !"
];

const pageContents = {
    1: {
        title: "Bonjour, monde!",
        content: '<p>Il existe plusieurs visions du terme :</p><p>le monde est la matière, l\'espace et les phénomènes qui nous sont accessibles par les sens, l\'expérience ou la raison.</p><p>Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p><p>Le sens étendu désigne l\'univers dans son ensemble.</p>'
    },
    2: {
        title: "La Technologie",
        content: '<p>La technologie façonne notre quotidien de manière profonde et irréversible.</p><p>Des smartphones aux intelligences artificielles, nous vivons une révolution numérique sans précédent.</p><p>Chaque innovation apporte son lot de promesses et de défis pour l\'humanité.</p>'
    },
    3: {
        title: "L'Exploration Spatiale",
        content: '<p>Depuis la nuit des temps, l\'humanité a levé les yeux vers les étoiles.</p><p>De la Lune à Mars, nos ambitions spatiales ne cessent de grandir.</p><p>L\'espace n\'est plus une frontière, mais une destination.</p>'
    }
};

let currentPage = 1;

$('#btnPapillon').click(function() {
    new bootstrap.Modal($('#papillonModal')).show();
});

$('#btnReboot').click(function() {
    const quote = bladeRunnerQuotes[Math.floor(Math.random() * bladeRunnerQuotes.length)];
    $('#jumbotronTitle').text('Blade Runner Citation');
    $('#jumbotronContent').html('<p style="font-style: italic; color: #555;">"' + quote + '"</p>');
});

$('.pagination .page-link').click(function(e) {
    e.preventDefault();
    const page = $(this).data('page');

    if (page === 'prev' && currentPage > 1) currentPage--;
    else if (page === 'next' && currentPage < 3) currentPage++;
    else if (!isNaN(page)) currentPage = parseInt(page);

    const content = pageContents[currentPage];
    if (content) {
        $('#jumbotronTitle').text(content.title);
        $('#jumbotronContent').html(content.content);
        $('.pagination .page-item').removeClass('active');
        $('.pagination .page-link[data-page="' + currentPage + '"]').parent().addClass('active');
    }
});

$('.sidebar-item').click(function() {
    $('.sidebar-item').removeClass('active');
    $(this).addClass('active');
});

let progressValue = 60;

$('#btnProgressPlus').click(function() {
    progressValue = Math.min(100, progressValue + 10);
    $('#progressBar').css('width', progressValue + '%');
});

$('#btnProgressMinus').click(function() {
    progressValue = Math.max(0, progressValue - 10);
    $('#progressBar').css('width', progressValue + '%');
});

let keySequence = [];
$(document).keydown(function(e) {
    keySequence.push(e.key.toLowerCase());
    if (keySequence.length > 3) keySequence.shift();

    if (keySequence.join('') === 'dgc') {
        const recap = '<p><strong>Login:</strong> ' + ($('#loginField').val() || '(vide)') + '</p>' +
            '<p><strong>Mot de passe:</strong> ' + ($('#passwordField').val() || '(vide)') + '</p>' +
            '<p><strong>Domaine:</strong> ' + $('#domainField').val() + '</p>' +
            '<p><strong>Crypto:</strong> ' + $('#cryptoField').val() + '</p>' +
            '<p><strong>Valeur:</strong> ' + $('#valueField').val() + '</p>' +
            '<p><strong>URL:</strong> ' + $('#urlField').val() + '</p>';
        $('#formRecapContent').html(recap);
        new bootstrap.Modal($('#formModal')).show();
        keySequence = [];
    }
});

$('#rightForm').submit(function(e) {
    e.preventDefault();
    const email = $('#emailField').val().trim();
    const password = $('#passwordFieldRight').val().trim();

    if (email && password) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        $('#spinner').css('color', randomColor);
        alert('Formulaire validé ! Couleur du spinner changée.');
    }
});
});