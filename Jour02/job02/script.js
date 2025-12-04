function showhide() {
    // Vérifier si l'article existe déjà
    let article = document.getElementById('article-citation');
    
    if (article) {
        // Si l'article existe, on le supprime
        article.remove();
    } else {
        // Si l'article n'existe pas, on le crée et l'ajoute
        article = document.createElement('article');
        article.id = 'article-citation';
        article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
        document.body.appendChild(article);
    }
}

document.getElementById('button').addEventListener('click', showhide);