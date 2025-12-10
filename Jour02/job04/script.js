document.addEventListener('keydown', function(e) {
    console.log(e);
    const keylogger = document.getElementById('keylogger');
    const key = e.key.toLowerCase();
    
    // Gérer les touches Backspace et Delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
        if (document.activeElement !== keylogger) {
            // Empêcher le comportement par défaut si le focus n'est pas sur le textarea
            e.preDefault();
            // Effacer le dernier caractère du textarea
            if (e.key === 'Backspace' && keylogger.value.length > 0) {
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