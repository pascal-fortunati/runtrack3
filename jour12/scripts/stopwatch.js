import { lireEtat, ecrireEtat } from "./storage.js";
import { afficherToast } from "./toast.js";

// Fonction : obtient la couleur d'accent du chronomètre en fonction des préférences
function obtenirAccentChrono() {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const accent = prefs.accent || "sky";
  if (accent === "emerald") return { bg: "bg-emerald-600", hoverBg: "hover:bg-emerald-500" };
  if (accent === "rose") return { bg: "bg-rose-600", hoverBg: "hover:bg-rose-500" };
  return { bg: "bg-sky-600", hoverBg: "hover:bg-sky-500" };
}

// Fonction : crée un nouveau chronomètre
function creerChrono() {
  return {
    id: `sw-${Date.now()}`,
    elapsedMs: 0,
    running: false,
    startedAt: null,
    laps: []
  };
}

// Fonction : formate un temps en MM:SS,cc
function formaterTemps(ms) {
  const totalMs = Math.max(0, ms);
  const totalSec = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSec / 60);
  const secondes = totalSec % 60;
  const centiemes = Math.floor((totalMs % 1000) / 10);
  const mm = String(minutes).padStart(2, "0");
  const ss = String(secondes).padStart(2, "0");
  const cc = String(centiemes).padStart(2, "0");
  return `${mm}:${ss},${cc}`;
}

// Fonction : rend une carte de chronomètre avec liste de tours
function creerCarteChrono(chrono) {
  // Création de l'élément article pour la carte chronomètre
  const article = document.createElement("article");
  article.className = "rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3";
  article.dataset.id = chrono.id;
  
  // Récupération de l'accentuation de couleur du chronomètre
  const accent = obtenirAccentChrono();

  // Création de l'élément div pour afficher le temps du chronomètre
  const temps = document.createElement("div");
  temps.className = "text-3xl tabular-nums mb-2";
  temps.dataset.role = "chrono-temps";
  temps.textContent = formaterTemps(chrono.elapsedMs);

  // Création de l'élément div pour afficher les boutons de contrôle du chronomètre
  const boutons = document.createElement("div");
  boutons.className = "flex gap-2 mb-2";

  // Création de l'élément bouton pour démarrer/arrêter le chronomètre
  const startPause = document.createElement("button");
  startPause.type = "button";
  startPause.dataset.action = "start-stop-chrono";
  startPause.className = `px-3 py-1.5 rounded-full text-white text-xs ${accent.bg} ${accent.hoverBg}`;
  startPause.textContent = chrono.running ? "Pause" : "Démarrer";

  // Création de l'élément bouton pour enregistrer un tour
  const lap = document.createElement("button");
  lap.type = "button";
  lap.dataset.action = "lap-chrono";
  lap.className = "px-3 py-1.5 rounded-full bg-slate-700 text-white text-xs hover:bg-slate-600";
  lap.textContent = "Enregistrer";

  // Création de l'élément bouton pour réinitialiser le chronomètre
  const reset = document.createElement("button");
  reset.type = "button";
  reset.dataset.action = "reset-chrono";
  reset.className = "px-3 py-1.5 rounded-full bg-slate-700 text-white text-xs hover:bg-slate-600";
  reset.textContent = "Réinitialiser";

  // Création de l'élément bouton pour supprimer le chronomètre
  const supprimer = document.createElement("button");
  supprimer.type = "button";
  supprimer.dataset.action = "supprimer-chrono";
  supprimer.className = "ml-auto w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700";
  supprimer.innerHTML = '<span class="material-icons-outlined text-base">delete</span>';

  boutons.appendChild(startPause);
  boutons.appendChild(lap);
  boutons.appendChild(reset);
  boutons.appendChild(supprimer);

  // Création de l'élément div pour afficher la liste des tours enregistrés
  const listeTours = document.createElement("div");
  listeTours.className = "max-h-40 overflow-y-auto mt-2 space-y-1";
  listeTours.dataset.role = "chrono-laps";

  article.appendChild(temps);
  article.appendChild(boutons);
  article.appendChild(listeTours);

  rafraichirTours(chrono, article);
  return article;
}

// Fonction : applique le thème (clair ou sombre) aux cartes de chronomètres
export function appliquerThemeCartesChronos(themeOption) {
  let theme = themeOption;
  if (!theme) {
    const etat = lireEtat();
    theme = (etat.preferences && etat.preferences.theme) || "dark";
  }
  const cartes = document.querySelectorAll("#stopwatch-list article");
  cartes.forEach((article) => {
    if (theme === "light") {
      article.classList.remove("bg-slate-800/70", "border-slate-700");
      article.classList.add("bg-white", "border-slate-200", "shadow-sm");
    } else {
      article.classList.remove("bg-white", "border-slate-200", "shadow-sm");
      article.classList.add("bg-slate-800/70", "border-slate-700");
    }
  });
}

// Fonction : calcule le meilleur et le pire tour
function trouverExtremesTours(laps) {
  if (laps.length === 0) return { minId: null, maxId: null };
  let minId = laps[0].id;
  let maxId = laps[0].id;
  let minDur = laps[0].durationMs;
  let maxDur = laps[0].durationMs;
  laps.forEach((lap) => {
    if (lap.durationMs < minDur) {
      minDur = lap.durationMs;
      minId = lap.id;
    }
    if (lap.durationMs > maxDur) {
      maxDur = lap.durationMs;
      maxId = lap.id;
    }
  });
  return { minId, maxId };
}

// Fonction : met à jour l'affichage de la liste des tours
function rafraichirTours(chrono, article) {
  const conteneur = article.querySelector("[data-role=chrono-laps]");
  if (!conteneur) return;
  conteneur.innerHTML = "";

  const { minId, maxId } = trouverExtremesTours(chrono.laps);

  chrono.laps.slice().reverse().forEach((lap, index) => {
    const ligne = document.createElement("div");
    let couleur = "text-slate-300";
    if (lap.id === minId) couleur = "text-emerald-400";
    if (lap.id === maxId) couleur = "text-red-400";
    ligne.className = `flex justify-between text-xs ${couleur}`;
    const num = document.createElement("span");
    num.textContent = `Chronomètre ${chrono.laps.length - index}`;
    const temps = document.createElement("span");
    temps.textContent = formaterTemps(lap.durationMs);
    ligne.appendChild(num);
    ligne.appendChild(temps);
    conteneur.appendChild(ligne);
  });
}

// Fonction : met à jour tous les chronomètres à l'écran
function tickChronos() {
  const etat = lireEtat();
  const maintenant = Date.now();
  let modifie = false;

  etat.chronometres.forEach((chrono) => {
    if (!chrono.running || chrono.startedAt == null) return;
    chrono.elapsedMs = (chrono.elapsedMs || 0) + (maintenant - chrono.startedAt);
    chrono.startedAt = maintenant;
    modifie = true;
  });

  if (modifie) {
    ecrireEtat(etat);
  }

  document.querySelectorAll("article[data-id^=sw-]").forEach((article) => {
    const id = article.dataset.id;
    const chrono = etat.chronometres.find((c) => c.id === id);
    if (!chrono) return;
    const tempsEl = article.querySelector("[data-role=chrono-temps]");
    if (tempsEl) tempsEl.textContent = formaterTemps(chrono.elapsedMs);
  });

  requestAnimationFrame(tickChronos);
}

// Fonction : rafraîchit complètement la liste des chronomètres
function rafraichirChronos() {
  const conteneur = document.getElementById("stopwatch-list");
  if (!conteneur) return;
  const etat = lireEtat();
  conteneur.innerHTML = "";
  etat.chronometres.forEach((c) => conteneur.appendChild(creerCarteChrono(c)));
  appliquerThemeCartesChronos();
}

// Fonction : initialise l'onglet chronomètres
export function initialiserChronometres() {
  const etat = lireEtat();
  if (!etat.chronometres) etat.chronometres = [];
  ecrireEtat(etat);
  rafraichirChronos();
  tickChronos();

  const boutonAjouter = document.getElementById("add-stopwatch");
  if (boutonAjouter) {
    boutonAjouter.addEventListener("click", () => {
      const e = lireEtat();
      e.chronometres.push(creerChrono());
      ecrireEtat(e);
      rafraichirChronos();
      afficherToast("Chronomètre créé", "success");
    });
  }

  const liste = document.getElementById("stopwatch-list");
  if (liste) {
    liste.addEventListener("click", (event) => {
      const cible = event.target;
      const article = cible.closest("article[data-id]");
      if (!article) return;
      const id = article.dataset.id;
      const etatCourant = lireEtat();
      const chrono = etatCourant.chronometres.find((c) => c.id === id);
      if (!chrono) return;

      const startStop = cible.closest("button[data-action=\"start-stop-chrono\"]");
      const lap = cible.closest("button[data-action=\"lap-chrono\"]");
      const reset = cible.closest("button[data-action=\"reset-chrono\"]");
      const supprimer = cible.closest("button[data-action=\"supprimer-chrono\"]");

      if (startStop) {
        if (!chrono.running) {
          chrono.running = true;
          chrono.startedAt = Date.now();
        } else {
          chrono.running = false;
          chrono.elapsedMs += Date.now() - (chrono.startedAt || Date.now());
          chrono.startedAt = null;
        }
        ecrireEtat(etatCourant);
        rafraichirChronos();
        if (!chrono.running) {
          afficherToast("Chronomètre arrêté : " + formaterTemps(chrono.elapsedMs), "success");
        }
        return;
      }

      if (lap) {
        const maintenant = Date.now();
        let total = chrono.elapsedMs;
        if (chrono.running && chrono.startedAt != null) {
          total += maintenant - chrono.startedAt;
          chrono.startedAt = maintenant;
        }
        const dernierTotal = chrono.laps.reduce((acc, l) => acc + l.durationMs, 0);
        const dureeTour = total - dernierTotal;
        chrono.laps.push({ id: `lap-${Date.now()}-${chrono.laps.length}`, durationMs: dureeTour });
        ecrireEtat(etatCourant);
        rafraichirChronos();
        afficherToast("Chronomètre enregistré : " + formaterTemps(dureeTour), "info");
        return;
      }

      if (reset) {
        chrono.running = false;
        chrono.elapsedMs = 0;
        chrono.startedAt = null;
        chrono.laps = [];
        ecrireEtat(etatCourant);
        rafraichirChronos();
        afficherToast("Chronomètre réinitialisé", "info");
        return;
      }

      if (supprimer) {
        etatCourant.chronometres = etatCourant.chronometres.filter((c) => c.id !== id);
        ecrireEtat(etatCourant);
        rafraichirChronos();
        afficherToast("Chronomètre supprimé", "info");
      }
    });
  }
}
