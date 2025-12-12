// Fonctions de validation
function notEmpty(val) {
    return val.trim() === '' ? 'Ce champ est requis.' : '';
}
function validEmail(val) {
    const empty = notEmpty(val);
    if (empty) return empty;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val) ? '' : 'Email invalide.';
}
function validPassword(val) {
    const empty = notEmpty(val);
    if (empty) return empty;
    if (val.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
    return '';
}
function validCP(val) {
    const empty = notEmpty(val);
    if (empty) return empty;
    return /^\d{5}$/.test(val) ? '' : 'Code postal invalide (5 chiffres).';
}

// Connexion Formulaire Validation
function validerConnexion(event) {
    event.preventDefault();
    let valid = true;
    const checks = [
        ['email', validEmail],
        ['password', validPassword]
    ];
    checks.forEach(([id, validator]) => {
        const value = document.getElementById(id).value;
        const errorDiv = document.getElementById(id + '-error');
        const error = validator(value);
        errorDiv.textContent = error;
        if (error) valid = false;
    });
    if (valid) {
        alert('Connexion réussie !');
    }
}

// Inscription Formulaire Validation
function validerInscription(event) {
    event.preventDefault();
    let valid = true;

    const checks = [
        ['nom', notEmpty],
        ['prenom', notEmpty],
        ['adresse', notEmpty],
        ['cp', validCP],
        ['email', validEmail],
        ['password', validPassword]
    ];
    checks.forEach(([id, validator]) => {
        const value = document.getElementById(id).value;
        const errorDiv = document.getElementById(id + '-error');
        const error = validator(value);
        errorDiv.textContent = error;
        if (error) valid = false;
    });
    if (valid) {
        alert('Inscription réussie !');
    }
}