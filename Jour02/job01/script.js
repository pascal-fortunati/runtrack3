function citation() {
    const citationElement = document.getElementById('citation');
    const contenu = citationElement.textContent;
    console.log(contenu);
}

document.getElementById('button').addEventListener('click', citation);