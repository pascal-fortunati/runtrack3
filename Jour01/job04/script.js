function bisextile(annee) {
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    }
    return false;
}

// Commentaire de test
console.log("2020 est bissextile :", bisextile(2020));
console.log("2021 est bissextile :", bisextile(2021));
console.log("2000 est bissextile :", bisextile(2000));
console.log("1900 est bissextile :", bisextile(1900));