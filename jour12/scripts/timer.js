import { lireEtat, ecrireEtat } from "./storage.js";
import { afficherToast } from "./toast.js";

// Fonction : obtient l'accentuation de couleur du timer
function obtenirAccentTimer() {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const accent = prefs.accent || "sky";
  if (accent === "emerald") return { bg: "bg-emerald-600", hoverBg: "hover:bg-emerald-500", stroke: "#059669", ring: "focus:ring-emerald-500" };
  if (accent === "rose") return { bg: "bg-rose-600", hoverBg: "hover:bg-rose-500", stroke: "#e11d48", ring: "focus:ring-rose-500" };
  return { bg: "bg-sky-600", hoverBg: "hover:bg-sky-500", stroke: "#0ea5e9", ring: "focus:ring-sky-500" };
}

// Fonction : crée un nouveau timer par défaut
function creerTimerParDefaut() {
  return {
    id: `tm-${Date.now()}`,
    label: "Réveil",
    durationMs: 5 * 60 * 1000,
    remainingMs: 5 * 60 * 1000,
    running: false,
    startedAt: null
  };
}

// Fonction : formate une durée en HH:MM:SS
function formaterDuree(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// Fonction : décompose une durée en heures, minutes, secondes
function decomposerDuree(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { h, m, s };
}

// Fonction : calcule l'angle de progression (0-1)
function calculerProgression(timer) {
  if (timer.durationMs === 0) return 0;
  return 1 - timer.remainingMs / timer.durationMs;
}

// Fonction : met à jour le dessin du cercle SVG
function appliquerProgressionCercle(circle, progression) {
  const rayon = 40;
  const perimetre = 2 * Math.PI * rayon;
  const offset = perimetre * (1 - progression);
  circle.style.strokeDasharray = `${perimetre}`;
  circle.style.strokeDashoffset = `${offset}`;
}

// Fonction : rend une carte timer avec cercle SVG
function creerCarteTimer(timer) {
  const article = document.createElement("article");
  article.className = "rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 flex items-center gap-4";
  article.dataset.id = timer.id;

  const etatTheme = lireEtat();
  const prefsTheme = etatTheme.preferences || {};
  const theme = prefsTheme.theme || "dark";
  const clair = theme === "light";

  const accent = obtenirAccentTimer();

  // Wrapper SVG pour le cercle et le temps
  const svgWrapper = document.createElement("div");
  svgWrapper.className = "w-20 h-20 relative";
  svgWrapper.innerHTML = `
    <svg viewBox="0 0 100 100" class="w-full h-full rotate-[-90deg]">
      <circle cx="50" cy="50" r="40" stroke="rgba(148,163,184,0.3)" stroke-width="6" fill="none"></circle>
      <circle data-role="timer-circle" cx="50" cy="50" r="40" stroke="${accent.stroke}" stroke-width="6" fill="none" stroke-linecap="round"></circle>
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <span data-role="timer-time" class="text-xs tabular-nums"></span>
    </div>
  `;

  // Récupération des éléments SVG pour le cercle et le temps
  const cercle = svgWrapper.querySelector("[data-role=timer-circle]");
  const temps = svgWrapper.querySelector("[data-role=timer-time]");
  if (cercle && temps) {
    appliquerProgressionCercle(cercle, calculerProgression(timer));
    temps.textContent = formaterDuree(timer.remainingMs);
  }

  // Contenu principal de la carte timer
  const contenu = document.createElement("div");
  contenu.className = "flex-1 flex flex-col gap-1";

  // Champ de saisie du titre du timer
  const titre = document.createElement("input");
  titre.type = "text";
  titre.value = timer.label || "Réveil";
  titre.className = "bg-transparent text-sm font-medium outline-none";
  titre.addEventListener("change", () => {
    const etat = lireEtat();
    const t = etat.timers.find((x) => x.id === timer.id);
    if (!t) return;
    t.label = titre.value || "Réveil";
    ecrireEtat(etat);
  });

  // Controles de régulation de durée (heures, minutes, secondes)
  const reglages = document.createElement("div");
  reglages.className = "flex items-center gap-2 mt-1 text-[11px] text-slate-300";
  const iconeTemps = document.createElement("span");
  iconeTemps.className = "material-icons-outlined text-[14px] text-slate-400";
  iconeTemps.textContent = "schedule";
  const { h, m, s } = decomposerDuree(timer.durationMs || timer.remainingMs);

  // Champ de saisie des heures
  const inputHeures = document.createElement("input");
  inputHeures.type = "tel";
  inputHeures.inputMode = "numeric";
  inputHeures.value = String(h);
  inputHeures.className = clair
    ? `w-12 bg-slate-100 rounded border border-slate-300 px-1 py-0.5 text-[11px] text-center text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-12 bg-slate-800 rounded border border-slate-600 px-1 py-0.5 text-[11px] text-center focus:outline-none focus:ring-1 ${accent.ring}`;
  inputHeures.placeholder = "hh";
  
  // Champ de saisie des minutes
  const inputMinutes = document.createElement("input");
  inputMinutes.type = "tel";
  inputMinutes.inputMode = "numeric";
  inputMinutes.value = String(m);
  inputMinutes.className = clair
    ? `w-12 bg-slate-100 rounded border border-slate-300 px-1 py-0.5 text-[11px] text-center text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-12 bg-slate-800 rounded border border-slate-600 px-1 py-0.5 text-[11px] text-center focus:outline-none focus:ring-1 ${accent.ring}`;
  inputMinutes.placeholder = "mm";

  // Champ de saisie des secondes
  const inputSecondes = document.createElement("input");
  inputSecondes.type = "tel";
  inputSecondes.inputMode = "numeric";
  inputSecondes.value = String(s);
  inputSecondes.className = clair
    ? `w-12 bg-slate-100 rounded border border-slate-300 px-1 py-0.5 text-[11px] text-center text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-12 bg-slate-800 rounded border border-slate-600 px-1 py-0.5 text-[11px] text-center focus:outline-none focus:ring-1 ${accent.ring}`;
  inputSecondes.placeholder = "ss";

  // Étiquettes de formatage de durée (heures, minutes, secondes)
  const labelH = document.createElement("span");
  labelH.textContent = ":";
  labelH.className = "text-slate-400";
  const labelM = document.createElement("span");
  labelM.textContent = ":";
  labelM.className = "text-slate-400";
  const labelS = document.createElement("span");
  labelS.textContent = "";

  // Fonction : applique la nouvelle durée entrée par l'utilisateur au timer
  function appliquerNouvelleDuree() {
    const hVal = Math.max(0, Math.min(23, parseInt(inputHeures.value || "0", 10)));
    const mVal = Math.max(0, Math.min(59, parseInt(inputMinutes.value || "0", 10)));
    const sVal = Math.max(0, Math.min(59, parseInt(inputSecondes.value || "0", 10)));
    const totalMs = (hVal * 3600 + mVal * 60 + sVal) * 1000;
    if (totalMs <= 0) {
      return;
    }
    const etat = lireEtat();
    const t = etat.timers.find((x) => x.id === timer.id);
    if (!t || t.running) {
      return;
    }
    t.durationMs = totalMs;
    t.remainingMs = totalMs;
    ecrireEtat(etat);
    rafraichirTimers();
  }

  [inputHeures, inputMinutes, inputSecondes].forEach((input) => {
    input.addEventListener("change", appliquerNouvelleDuree);
  });

  reglages.appendChild(iconeTemps);
  reglages.appendChild(inputHeures);
  reglages.appendChild(labelH);
  reglages.appendChild(inputMinutes);
  reglages.appendChild(labelM);
  reglages.appendChild(inputSecondes);
  reglages.appendChild(labelS);

  // Controles de timer (démarrer/pause, réinitialiser, supprimer)
  const controles = document.createElement("div");
  controles.className = "flex gap-2 mt-2";

  // Bouton de démarrage/pause de timer
  const boutonStart = document.createElement("button");
  boutonStart.type = "button";
  boutonStart.dataset.action = "start-stop-timer";
  boutonStart.className = `px-3 py-1.5 rounded-full text-white text-xs ${accent.bg} ${accent.hoverBg}`;
  boutonStart.textContent = timer.running ? "Pause" : "Démarrer";

  // Bouton de réinitialisation de timer
  const boutonReset = document.createElement("button");
  boutonReset.type = "button";
  boutonReset.dataset.action = "reset-timer";
  boutonReset.className = "px-3 py-1.5 rounded-full bg-slate-700 text-white text-xs hover:bg-slate-600";
  boutonReset.textContent = "Réinitialiser";

  // Bouton de suppression de timer
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.type = "button";
  boutonSupprimer.dataset.action = "supprimer-timer";
  boutonSupprimer.className = "ml-auto w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700";
  boutonSupprimer.innerHTML = '<span class="material-icons-outlined text-base">delete</span>';

  controles.appendChild(boutonStart);
  controles.appendChild(boutonReset);
  controles.appendChild(boutonSupprimer);

  contenu.appendChild(titre);
  contenu.appendChild(reglages);
  contenu.appendChild(controles);

  article.appendChild(svgWrapper);
  article.appendChild(contenu);

  return article;
}

// Fonction : applique le thème (clair ou sombre) aux cartes de timers
export function appliquerThemeCartesTimers(themeOption) {
  let theme = themeOption;
  if (!theme) {
    const etat = lireEtat();
    theme = (etat.preferences && etat.preferences.theme) || "dark";
  }
  const cartes = document.querySelectorAll("#timer-list article");
  cartes.forEach((article) => {
    const inputs = article.querySelectorAll('input[type="tel"][inputmode="numeric"]');
    if (theme === "light") {
      article.classList.remove("bg-slate-800/70", "border-slate-700");
      article.classList.add("bg-white", "border-slate-200", "shadow-sm");

      inputs.forEach((input) => {
        input.classList.remove("bg-slate-800", "border-slate-600", "text-slate-100", "text-slate-200");
        input.classList.add("bg-slate-100", "border-slate-300", "text-slate-900");
      });
    } else {
      article.classList.remove("bg-white", "border-slate-200", "shadow-sm");
      article.classList.add("bg-slate-800/70", "border-slate-700");

      inputs.forEach((input) => {
        input.classList.remove("bg-slate-100", "border-slate-300", "text-slate-900");
        input.classList.add("bg-slate-800", "border-slate-600");
      });
    }
  });
}

// Fonction : met à jour la liste des timers à l'écran
function rafraichirTimers() {
  const conteneur = document.getElementById("timer-list");
  if (!conteneur) return;
  const etat = lireEtat();
  conteneur.innerHTML = "";
  etat.timers.forEach((t) => conteneur.appendChild(creerCarteTimer(t)));
  appliquerThemeCartesTimers();
}

// Fonction : met à jour les temps restants et l'affichage en continu
function boucleTimers() {
  const etat = lireEtat();
  const maintenant = Date.now();
  let misAJour = false;

  etat.timers.forEach((timer) => {
    if (!timer.running || timer.startedAt == null) return;
    const ecoule = maintenant - timer.startedAt;
    timer.remainingMs = Math.max(0, timer.durationMs - ecoule);
    if (timer.remainingMs === 0) {
      timer.running = false;
      timer.startedAt = null;
      declencherFinTimer(timer);
    }
    misAJour = true;
  });

  if (misAJour) {
    ecrireEtat(etat);
  }

  document.querySelectorAll("article[data-id^=tm-]").forEach((article) => {
    const id = article.dataset.id;
    const timer = etat.timers.find((t) => t.id === id);
    if (!timer) return;
    const cercle = article.querySelector("[data-role=timer-circle]");
    const temps = article.querySelector("[data-role=timer-time]");
    const boutonStart = article.querySelector("button[data-action=\"start-stop-timer\"]");
    if (cercle) appliquerProgressionCercle(cercle, calculerProgression(timer));
    if (temps) temps.textContent = formaterDuree(timer.remainingMs);
    if (boutonStart) boutonStart.textContent = timer.running ? "Pause" : "Démarrer";
  });

  requestAnimationFrame(boucleTimers);
}

// Fonction : déclenche la fin d'un timer (notification + son)
function declencherFinTimer(timer) {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const telephoneAllume = prefs.telephoneAllume === true;
  if (!telephoneAllume) return;
  const sonsActifs = prefs.sonsActifs !== false;
  const vibrationsActives = prefs.vibrationsActives !== false;
  const notificationsActives = prefs.notificationsActives !== false;

  if (notificationsActives && "Notification" in window && Notification.permission === "granted") {
    const options = {
      body: timer.label || "Votre réveil est terminé.",
      icon: "icons/icon-192.png"
    };
    if (vibrationsActives) {
      options.vibrate = [200, 100, 200];
    }
    new Notification("Réveil terminé", options);
  }

  if (sonsActifs) {
    const audio = new Audio("sounds/alarme.wav");
    audio.play().catch(() => {});
  }

  if (vibrationsActives && navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }

  afficherToast(timer.label || "Temps écoulé", "alarm");
}

// Fonction : initialise l'onglet timers
export function initialiserTimers() {
  const etat = lireEtat();
  if (!etat.timers) etat.timers = [];
  ecrireEtat(etat);
  rafraichirTimers();
  boucleTimers();

  const boutonAjouter = document.getElementById("add-timer");
  if (boutonAjouter) {
    boutonAjouter.addEventListener("click", () => {
      const e = lireEtat();
      const t = creerTimerParDefaut();
      e.timers.push(t);
      ecrireEtat(e);
      rafraichirTimers();
      afficherToast("Réveil créé", "success");
    });
  }
  // Gestion des interactions avec les cartes de timers
  const liste = document.getElementById("timer-list");
  if (liste) {
    liste.addEventListener("click", (event) => {
      const cible = event.target;
      const article = cible.closest("article[data-id]");
      if (!article) return;
      const id = article.dataset.id;
      const etatActuel = lireEtat();
      const timer = etatActuel.timers.find((t) => t.id === id);
      if (!timer) return;

      const startStop = cible.closest("button[data-action=\"start-stop-timer\"]");
      const reset = cible.closest("button[data-action=\"reset-timer\"]");
      const supprimer = cible.closest("button[data-action=\"supprimer-timer\"]");

      if (startStop) {
        if (!timer.running) {
          timer.running = true;
          timer.startedAt = Date.now() - (timer.durationMs - timer.remainingMs);
        } else {
          timer.running = false;
          timer.remainingMs = Math.max(0, timer.durationMs - (Date.now() - timer.startedAt));
          timer.startedAt = null;
        }
        ecrireEtat(etatActuel);
        return;
      }

      if (reset) {
        timer.running = false;
        timer.remainingMs = timer.durationMs;
        timer.startedAt = null;
        ecrireEtat(etatActuel);
        rafraichirTimers();
        return;
      }

      if (supprimer) {
        const libelle = timer.label && timer.label.trim().length > 0 ? timer.label : "Réveil";
        etatActuel.timers = etatActuel.timers.filter((t) => t.id !== id);
        ecrireEtat(etatActuel);
        rafraichirTimers();
        afficherToast(`${libelle} supprimé`, "info");
      }
    });
  }
}
