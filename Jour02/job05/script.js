window.addEventListener('scroll', function() {
    const footer = document.getElementById('footer');
    const progressText = document.getElementById('progress-text');
    
    // Calculer le pourcentage de défilement
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollableDistance = documentHeight - windowHeight;
    const scrollPercentage = (scrollTop / scrollableDistance) * 100;
    
    // Mettre à jour le texte du pourcentage
    progressText.textContent = Math.round(scrollPercentage) + '%';
    
    // Changer la couleur du footer en fonction du pourcentage
    const hue = 120 - (scrollPercentage * 1.2); // 120 (vert) à 0 (rouge)
    footer.style.background = `hsl(${hue}, 70%, 50%)`;
});