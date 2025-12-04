async function jourtravaille(date) {
    let jour = date.getDate();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let jourSemaine = date.getDay();
    
    // Noms des jours et des mois en français
    const nomsJours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const nomsMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    
    // Récupération des jours fériés via une API publique
    let joursFeries = [];
    try {
        const response = await fetch(`https://calendrier.api.gouv.fr/jours-feries/metropole/${annee}.json`);
        const data = await response.json();
        
        // Transformation des données pour correspondre au format "jour/mois/année"
        joursFeries = Object.keys(data).map(dateStr => {
            const [year, month, day] = dateStr.split('-');
            return `${parseInt(day)}/${parseInt(month)}/${year}`;
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des jours fériés:", error);
    }
    
    let dateStr = jour + "/" + mois + "/" + annee;
    let dateFormatee = nomsJours[jourSemaine] + " " + jour.toString().padStart(2, '0') + " " + nomsMois[mois - 1] + " " + annee;
    
    if (joursFeries.includes(dateStr)) {
        console.log("Le " + dateFormatee + " est un jour férié");
    } else if (jourSemaine === 0 || jourSemaine === 6) {
        console.log("Non, " + dateFormatee + " est un week-end");
    } else {
        console.log("Oui, " + dateFormatee + " est un jour travaillé");
    }
}

// commentaires de test
jourtravaille(new Date(2025, 0, 1));   // Jour férié
jourtravaille(new Date(2025, 4, 30));  // Jour travaillé
jourtravaille(new Date(2025, 5, 14));  // Jour férié
jourtravaille(new Date(2025, 6, 26));  // Week-end
jourtravaille(new Date(2025, 11, 25)); // Jour férié
jourtravaille(new Date(2025, 11, 26)); // Jour travaillé