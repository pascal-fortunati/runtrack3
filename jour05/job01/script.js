// Connexion Formulaire Validation
function validateField(id, validator, message) {
    const value = document.getElementById(id).value;
    const errorDiv = document.getElementById(id + '-error');
    errorDiv.textContent = '';
    setTimeout(() => {
        const error = validator(value);
        if (error) {
            errorDiv.textContent = error;
        }
    }, 200);
}
function validEmail(val) {
    if (val.trim() === '') return 'Ce champ est requis.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val) ? '' : 'Email invalide.';
}
function validPassword(val) {
    if (val.trim() === '') return 'Ce champ est requis.';
    if (val.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
    return '';
}
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
function validateField(id, validator, message) {
    const value = document.getElementById(id).value;
    const errorDiv = document.getElementById(id + '-error');
    errorDiv.textContent = '';
    setTimeout(() => {
        const error = validator(value);
        if (error) {
            errorDiv.textContent = error;
        }
    }, 200); // Délai pour éviter validation instantanée
}

function notEmpty(val) {
    return val.trim() === '' ? 'Ce champ est requis.' : '';
}
function validEmail(val) {
    if (val.trim() === '') return 'Ce champ est requis.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val) ? '' : 'Email invalide.';
}
function validPassword(val) {
    if (val.trim() === '') return 'Ce champ est requis.';
    if (val.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
    return '';
}
function validCP(val) {
    if (val.trim() === '') return 'Ce champ est requis.';
    return /^\d{5}$/.test(val) ? '' : 'Code postal invalide (5 chiffres).';
}

function validerInscription(event) {
    event.preventDefault();
    let valid = true;
    // Liste des champs à valider
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