async function jourtravaille(date) {
    let jour = date.getDate();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let jourSemaine = date.getDay();
    
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
    
    if (joursFeries.includes(dateStr)) {
        console.log("Le " + dateStr + " est un jour férié");
    } else if (jourSemaine === 0 || jourSemaine === 6) {
        console.log("Non, " + dateStr + " est un week-end");
    } else {
        console.log("Oui, " + dateStr + " est un jour travaillé");
    }
}

// Commentaires de test
jourtravaille(new Date(2025, 0, 1));  // Jour férié
jourtravaille(new Date(2025, 4, 1));  // Jour férié
jourtravaille(new Date(2025, 4, 2));  // Jour travaillé
jourtravaille(new Date(2025, 4, 5));  // Jour travaillé (lundi)