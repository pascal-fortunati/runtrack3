function addone() {
    const compteur = document.getElementById('compteur');
    let valeur = parseInt(compteur.textContent);
    valeur++;
    compteur.textContent = valeur;
}

document.getElementById('button').addEventListener('click', addone);