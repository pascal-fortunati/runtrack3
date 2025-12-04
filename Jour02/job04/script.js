document.addEventListener('keydown', function(event) {
    const keylogger = document.getElementById('keylogger');
    const key = event.key.toLowerCase();
    
    // Gérer les touches Backspace et Delete
    if (event.key === 'Backspace' || event.key === 'Delete') {
        if (document.activeElement !== keylogger) {
            // Empêcher le comportement par défaut si le focus n'est pas sur le textarea
            event.preventDefault();
            // Effacer le dernier caractère du textarea
            if (event.key === 'Backspace' && keylogger.value.length > 0) {
                keylogger.value = keylogger.value.slice(0, -1);
            }
        }
        return;
    }
    
    // Gérer les lettres de a à z
    if (key.length === 1 && key >= 'a' && key <= 'z') {
        // Empêcher le comportement par défaut si le focus n'est pas sur le textarea
        if (document.activeElement === keylogger) {
            setTimeout(() => {
                const cursorPos = keylogger.selectionStart;
                keylogger.value = keylogger.value.slice(0, cursorPos) + key + keylogger.value.slice(cursorPos);
                keylogger.setSelectionRange(cursorPos + 1, cursorPos + 1);
            }, 0);
        } else {
            // Ajouter la lettre normalement
            keylogger.value += key;
        }
    }
});