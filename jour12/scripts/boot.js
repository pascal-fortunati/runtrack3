// Créer l'objet audio
const bootSound = new Audio('sounds/boot.wav');

// Fonction pour démarrer le boot avec son
export function demarrerBoot() {
  return new Promise((resolve) => {
    const ecran = document.getElementById("boot-screen");
    const barre = document.getElementById("boot-progress");
    const conteneurBarre = document.getElementById("boot-progress-container");
    const logoWrapper = ecran ? ecran.querySelector(".w-24.h-24") : null;

    if (!ecran || !barre || !conteneurBarre) {
      resolve();
      return;
    }

    // Changer le style de l'écran de boot
    ecran.classList.remove("bg-black");
    ecran.classList.add("bg-slate-900");

    if (logoWrapper) {
      logoWrapper.classList.add("opacity-0", "scale-75", "transition-all", "duration-500");
      requestAnimationFrame(() => {
        logoWrapper.classList.remove("opacity-0", "scale-75");
        logoWrapper.classList.add("opacity-100", "scale-100");
      });
    }
    // Masquer la barre de progression et le conteneur
    conteneurBarre.classList.add("hidden");

    setTimeout(() => {
      conteneurBarre.classList.remove("hidden");

      let valeur = 0;
      const dureeTotale = 2300;
      const intervalle = 120;
      const increment = (intervalle / dureeTotale) * 100;

      // Démarrer la progression de la barre
      const timer = setInterval(() => {
        valeur += increment;
        if (valeur >= 100) {
          valeur = 100;
          clearInterval(timer);
          ecran.classList.add("opacity-0");
          setTimeout(() => {
            ecran.style.display = "none";
            resolve();
          }, 700);
        }
        barre.style.width = `${valeur}%`;
      }, intervalle);
    }, 800);
  });
}

// Fonction pour afficher l'écran de démarrage
export function afficherEcranDemarrage() {
  const bouton = document.createElement('button');
  bouton.textContent = 'Démarrer le système';
  bouton.className = 'btn-demarrage';
  
  bouton.addEventListener('click', async () => {
    bouton.remove();
    await demarrerBoot();
  });
  
  document.body.appendChild(bouton);
}

// Fonction pour initialiser le son au premier clic n'importe où
let sonPret = false;

document.addEventListener('click', function initialiserSon() {
  if (!sonPret) {
    bootSound.play().then(() => {
      bootSound.pause();
      bootSound.currentTime = 0;
      sonPret = true;
    }).catch(() => {});
  }
  // Ne se déclenche qu'une fois
  document.removeEventListener('click', initialiserSon);
}, { once: true });
