import { lireEtat, ecrireEtat } from "./storage.js";
import { afficherToast } from "./toast.js";

// Fonction : retourne un formateur de date/heure pour une locale et un fuseau
function creerFormateurHeure(timeZone) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}

// Fonction : retourne un formateur de date complète française
function creerFormateurDate(timeZone) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

// Fonction : calcule le décalage horaire en heures par rapport à Paris
function calculerDecalage(timeZone) {
  const maintenant = Date.now();
  const formatParis = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit"
  });
  const formatAutre = new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    hour: "2-digit"
  });
  const heureParis = parseInt(formatParis.format(maintenant), 10);
  const heureAutre = parseInt(formatAutre.format(maintenant), 10);
  let diff = heureAutre - heureParis;
  if (diff > 12) diff -= 24;
  if (diff < -12) diff += 24;
  return diff;
}

function obtenirThemeHorloge() {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  return prefs.theme || "dark";
}

// Fonction : met à jour l'affichage heure/date locale et la barre de statut
function mettreAJourLocale() {
  const now = new Date();
  const heureEl = document.getElementById("local-time-display");
  const dateEl = document.getElementById("local-date-display");
  const statusTimeEl = document.getElementById("status-time");
  const qsTimeEl = document.getElementById("quick-settings-clock");
  if (!heureEl || !dateEl) return;

  const formatHeure = creerFormateurHeure("Europe/Paris");
  const formatDate = creerFormateurDate("Europe/Paris");
  const texteHeure = formatHeure.format(now);
  heureEl.textContent = texteHeure;
  dateEl.textContent = formatDate.format(now).replace(/^./, (c) => c.toUpperCase());

  if (statusTimeEl) {
    statusTimeEl.textContent = texteHeure.slice(0, 5);
  }
  if (qsTimeEl) {
    qsTimeEl.textContent = texteHeure.slice(0, 5);
  }
}

// Fonction : rend une carte horloge mondiale
function creerCarteHorloge(horloge) {
  const diff = calculerDecalage(horloge.timeZone);
  const maintenant = new Date();
  const formateurHeure = creerFormateurHeure(horloge.timeZone);
  const heure = formateurHeure.format(maintenant);

  const decalageTexte = diff === 0
    ? "Même heure que Paris"
    : diff > 0
      ? `+${diff}h par rapport à Paris`
      : `${diff}h par rapport à Paris`;

  const article = document.createElement("article");
  article.className = "rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 flex items-center justify-between";
  article.dataset.id = horloge.id;
  article.dataset.role = "carte-horloge";

  const etatTheme = lireEtat();
  const prefsTheme = etatTheme.preferences || {};
  const theme = prefsTheme.theme || "dark";
  const clair = theme === "light";

  const gauche = document.createElement("div");
  gauche.className = "flex flex-col";

  const titre = document.createElement("p");
  titre.className = "text-sm font-medium";
  titre.textContent = horloge.nom;

  const sousTitre = document.createElement("p");
  sousTitre.className = "text-xs text-slate-400";
  sousTitre.textContent = decalageTexte;

  gauche.appendChild(titre);
  gauche.appendChild(sousTitre);

  const droite = document.createElement("div");
  droite.className = "flex items-center gap-3";

  const heureEl = document.createElement("p");
  heureEl.className = "text-lg tabular-nums";
  heureEl.textContent = heure;
  heureEl.dataset.role = "world-clock-time";
  heureEl.dataset.tz = horloge.timeZone;

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.className = clair
    ? "w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-400"
    : "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-400";
  boutonSupprimer.setAttribute("aria-label", `Supprimer l'horloge ${horloge.nom}`);
  boutonSupprimer.dataset.action = "supprimer-horloge";
  boutonSupprimer.innerHTML = '<span class="material-icons-outlined text-base">delete</span>';

  droite.appendChild(heureEl);
  droite.appendChild(boutonSupprimer);

  article.appendChild(gauche);
  article.appendChild(droite);

  return article;
}

export function appliquerThemeCartesHorloge(themeOption) {
  let theme = themeOption;
  if (!theme) {
    const etat = lireEtat();
    theme = (etat.preferences && etat.preferences.theme) || "dark";
  }
  const cartes = document.querySelectorAll('article[data-role="carte-horloge"]');
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

// Fonction : met à jour l'affichage de toutes les horloges mondiales
function rafraichirHorloges() {
  const conteneur = document.getElementById("world-clock-list");
  const compteur = document.getElementById("world-clock-count");
  if (!conteneur || !compteur) return;

  const etat = lireEtat();
  conteneur.innerHTML = "";

  etat.horloges.forEach((h) => {
    conteneur.appendChild(creerCarteHorloge(h));
  });

  const n = etat.horloges.length;
  compteur.textContent = n === 0 ? "0 horloge" : n === 1 ? "1 horloge" : `${n} horloges`;
  appliquerThemeCartesHorloge();
}

// Fonction : met à jour uniquement les heures des horloges sans recréer les cartes
function tickHorloges() {
  const elements = document.querySelectorAll("[data-role=world-clock-time]");
  const maintenant = new Date();
  elements.forEach((el) => {
    const tz = el.dataset.tz;
    if (!tz) return;
    const formateur = creerFormateurHeure(tz);
    el.textContent = formateur.format(maintenant);
  });
}

// Fonction : ouvre une modale simple de sélection de fuseau (liste restreinte)
function ouvrirSelectionHorloge() {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalContent = document.getElementById("modal-content");
  if (!modalBackdrop || !modalContent) return;

  const theme = obtenirThemeHorloge();
  const clair = theme === "light";

  const options = [
    { nom: "New York, États-Unis", timeZone: "America/New_York" },
    { nom: "Londres, Royaume-Uni", timeZone: "Europe/London" },
    { nom: "Tokyo, Japon", timeZone: "Asia/Tokyo" },
    { nom: "Sydney, Australie", timeZone: "Australia/Sydney" },
    { nom: "São Paulo, Brésil", timeZone: "America/Sao_Paulo" },
    { nom: "Casablanca, Maroc", timeZone: "Africa/Casablanca" }
  ];

  modalContent.innerHTML = "";

  const titre = document.createElement("h2");
  titre.className = "text-sm font-medium mb-3";
  titre.textContent = "Ajouter une horloge";

  const liste = document.createElement("div");
  liste.className = "max-h-60 overflow-y-auto space-y-1 mb-4";

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = clair
      ? "w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between hover:bg-slate-100 hover:text-slate-900"
      : "w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between hover:bg-slate-800 hover:text-white";
    btn.textContent = opt.nom;
    btn.dataset.tz = opt.timeZone;
    btn.addEventListener("click", () => {
      const etat = lireEtat();
      const id = `tz-${Date.now()}`;
      etat.horloges.push({ id, nom: opt.nom, timeZone: opt.timeZone });
      ecrireEtat(etat);
      rafraichirHorloges();
      fermerModale();
      afficherToast(`Horloge ajoutée : ${opt.nom}`);
    });
    liste.appendChild(btn);
  });

  const actions = document.createElement("div");
  actions.className = "flex justify-end gap-2";

  const annuler = document.createElement("button");
  annuler.type = "button";
  annuler.className = clair
    ? "px-3 py-1.5 rounded-full text-xs text-slate-600 hover:bg-slate-100"
    : "px-3 py-1.5 rounded-full text-xs text-slate-300 hover:bg-slate-800";
  annuler.textContent = "Annuler";
  annuler.addEventListener("click", fermerModale);

  actions.appendChild(annuler);

  modalContent.appendChild(titre);
  modalContent.appendChild(liste);
  modalContent.appendChild(actions);

  modalBackdrop.classList.remove("hidden");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

// Fonction : ferme la modale générique
function fermerModale() {
  const modalBackdrop = document.getElementById("modal-backdrop");
  if (!modalBackdrop) return;
  modalBackdrop.classList.add("hidden");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

// Fonction : initialise les événements de l'onglet horloge
export function initialiserHorloge() {
  mettreAJourLocale();
  rafraichirHorloges();

  setInterval(() => {
    mettreAJourLocale();
    tickHorloges();
  }, 1000);

  const boutonAjouter = document.getElementById("add-world-clock");
  if (boutonAjouter) {
    boutonAjouter.addEventListener("click", () => {
      ouvrirSelectionHorloge();
    });
  }

  const liste = document.getElementById("world-clock-list");
  if (liste) {
    liste.addEventListener("click", (event) => {
      const cible = event.target;
      const bouton = cible.closest("button[data-action=\"supprimer-horloge\"]");
      if (!bouton) return;
      const carte = bouton.closest("article[data-id]");
      if (!carte) return;
      const id = carte.dataset.id;
      const etat = lireEtat();
      const horloge = etat.horloges.find((h) => h.id === id);
      etat.horloges = etat.horloges.filter((h) => h.id !== id);
      ecrireEtat(etat);
      rafraichirHorloges();
      const nom = horloge && horloge.nom ? horloge.nom : "Horloge";
      afficherToast(`${nom} supprimée`, "info");
    });
  }

  const modalBackdrop = document.getElementById("modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (event) => {
      if (event.target === modalBackdrop) {
        fermerModale();
      }
    });
  }
}
