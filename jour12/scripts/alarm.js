import { lireEtat, ecrireEtat } from "./storage.js";
import { afficherToast } from "./toast.js";

// Fonction : formate une heure (HH:MM) en texte 24h ou 12h selon préférences
function formaterHeure(h, m) {
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Fonction : obtient la couleur d'accent de l'alarme en fonction des préférences
function obtenirAccentAlarme() {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const accent = prefs.accent || "sky";
  if (accent === "emerald") return { bg: "bg-emerald-600", ring: "focus:ring-emerald-500", border: "border-emerald-500" };
  if (accent === "rose") return { bg: "bg-rose-600", ring: "focus:ring-rose-500", border: "border-rose-500" };
  return { bg: "bg-sky-600", ring: "focus:ring-sky-500", border: "border-sky-500" };
}

// Fonction : rend une badge pour chaque jour de la semaine
function creerBadgesJours(jours) {
  const accent = obtenirAccentAlarme();
  const theme = obtenirThemeCourant();
  const noms = ["L", "M", "M", "J", "V", "S", "D"];
  const couleurs = [
    "text-sky-400",
    "text-emerald-400",
    "text-teal-400",
    "text-indigo-400",
    "text-amber-400",
    "text-orange-400",
    "text-rose-400"
  ];
  const conteneur = document.createElement("div");
  conteneur.className = "flex gap-1 mt-1";
  conteneur.dataset.role = "alarme-jours";
  noms.forEach((nom, index) => {
    const actif = jours.includes(index);
    const span = document.createElement("span");
    const couleurJour = couleurs[index] || "";
    const baseInactif = theme === "light" ? "bg-slate-200" : "bg-slate-800";
    span.className = `w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${couleurJour} ${actif ? accent.bg : baseInactif}`;
    span.dataset.role = "badge-jour";
    span.textContent = nom;
    conteneur.appendChild(span);
  });
  return conteneur;
}

function obtenirThemeCourant() {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  return prefs.theme || "dark";
}

// Fonction : rend une carte d'alarme
function creerCarteAlarme(alarme) {
  const accent = obtenirAccentAlarme();
  const article = document.createElement("article");
  article.className = "rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 flex items-center justify-between";
  article.dataset.id = alarme.id;
  article.dataset.active = alarme.active ? "true" : "false";

  const gauche = document.createElement("div");
  gauche.className = "flex flex-col";

  const heure = document.createElement("p");
  heure.className = `text-2xl tabular-nums ${alarme.active ? "text-white" : "text-slate-400"}`;
  heure.textContent = formaterHeure(alarme.hour, alarme.minute);
  heure.dataset.role = "alarme-heure";

  const libelle = document.createElement("p");
  libelle.className = "text-xs text-slate-400";
  libelle.textContent = alarme.label || "Alarme";

  const etat = document.createElement("p");
  etat.className = "text-[11px] text-slate-400";
  etat.textContent = calculerTexteEtatAlarme(alarme);

  gauche.appendChild(heure);
  gauche.appendChild(libelle);
  gauche.appendChild(etat);
  gauche.appendChild(creerBadgesJours(alarme.days));

  const droite = document.createElement("div");
  droite.className = "flex flex-col items-end gap-2";

  const switchBtn = document.createElement("button");
  switchBtn.type = "button";
  switchBtn.dataset.action = "toggle-alarme";
  switchBtn.className = `w-11 h-6 rounded-full flex items-center ${alarme.active ? accent.bg : "bg-slate-600"}`;
  const curseur = document.createElement("span");
  curseur.className = `w-5 h-5 rounded-full bg-white shadow transform transition-transform ${alarme.active ? "translate-x-5" : "translate-x-0"}`;
  switchBtn.appendChild(curseur);

  const supprimer = document.createElement("button");
  supprimer.type = "button";
  supprimer.dataset.action = "supprimer-alarme";
  supprimer.className = "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700";
  supprimer.innerHTML = '<span class="material-icons-outlined text-base">delete</span>';

  droite.appendChild(switchBtn);
  droite.appendChild(supprimer);

  article.appendChild(gauche);
  article.appendChild(droite);

  return article;
}

// Fonction : met à jour le thème des cartes d'alarme
export function appliquerThemeCartesAlarmes(themeOption) {
  let theme = themeOption;
  if (!theme) {
    const etat = lireEtat();
    theme = (etat.preferences && etat.preferences.theme) || "dark";
  }
  const cartes = document.querySelectorAll("#alarm-list article");
  const classesAccentJours = ["bg-sky-600", "bg-emerald-600", "bg-rose-600"];
  cartes.forEach((article) => {
    const heureEl = article.querySelector('[data-role="alarme-heure"]');
    const estActive = article.dataset.active === "true";
    if (heureEl) {
      heureEl.classList.remove("text-white", "text-slate-400", "text-slate-900", "text-slate-500");
      if (theme === "light") {
        heureEl.classList.add(estActive ? "text-slate-900" : "text-slate-500");
      } else {
        heureEl.classList.add(estActive ? "text-white" : "text-slate-400");
      }
    }
    if (theme === "light") {
      article.classList.remove("bg-slate-800/70", "border-slate-700");
      article.classList.add("bg-white", "border-slate-200", "shadow-sm");
    } else {
      article.classList.remove("bg-white", "border-slate-200", "shadow-sm");
      article.classList.add("bg-slate-800/70", "border-slate-700");
    }

    const conteneurJours = article.querySelector('[data-role="alarme-jours"]');
    if (conteneurJours) {
      const badges = conteneurJours.querySelectorAll('[data-role="badge-jour"]');
      badges.forEach((badge) => {
        const estActif = classesAccentJours.some((cls) => badge.classList.contains(cls));
        if (estActif) return;
        badge.classList.remove("bg-slate-200", "bg-slate-800");
        badge.classList.add(theme === "light" ? "bg-slate-200" : "bg-slate-800");
      });
    }
  });
}

// Fonction : calcule le texte d'état de l'alarme (passée / dans x temps)
function calculerTexteEtatAlarme(alarme) {
  const maintenant = new Date();
  const minutesActuelles = maintenant.getHours() * 60 + maintenant.getMinutes();
  const minutesAlarme = alarme.hour * 60 + alarme.minute;

  if (minutesAlarme <= minutesActuelles) {
    return "passée";
  }

  const diff = minutesAlarme - minutesActuelles;
  const h = Math.floor(diff / 60);
  const m = diff % 60;

  if (h === 0) {
    return `dans ${m} min`;
  }
  if (m === 0) {
    return `dans ${h} h`;
  }
  return `dans ${h} h ${m} min`;
}

// Fonction : met à jour la liste des alarmes affichées
function rafraichirAlarmes() {
  const conteneur = document.getElementById("alarm-list");
  const texteVide = document.getElementById("alarm-empty-text");
  if (!conteneur || !texteVide) return;

  const etat = lireEtat();
  conteneur.innerHTML = "";

  const triées = [...etat.alarmes].sort((a, b) => {
    if (a.hour === b.hour) return a.minute - b.minute;
    return a.hour - b.hour;
  });

  triées.forEach((a) => conteneur.appendChild(creerCarteAlarme(a)));
  texteVide.classList.toggle("hidden", triées.length > 0);
  appliquerThemeCartesAlarmes();
}

// Fonction : crée une nouvelle alarme par défaut à l'heure actuelle + 5 min
function creerAlarmeParDefaut() {
  const maintenant = new Date();
  const heure = maintenant.getHours();
  const minute = (maintenant.getMinutes() + 5) % 60;
  return {
    id: `al-${Date.now()}`,
    hour: heure,
    minute: minute,
    days: [],
    label: "Alarme",
    active: true
  };
}

// Fonction : crée des alarmes pré-configurées en fonction du profil
function creerAlarmeDepuisProfil(typeProfil) {
  const maintenant = new Date();
  const baseId = Date.now();
  if (typeProfil === "semaine") {
    return [
      {
        id: `al-${baseId}-sem-1`,
        hour: 7,
        minute: 0,
        days: [0, 1, 2, 3, 4],
        label: "Réveil semaine",
        active: true
      }
    ];
  }
  if (typeProfil === "weekend") {
    return [
      {
        id: `al-${baseId}-we-1`,
        hour: 9,
        minute: 0,
        days: [5, 6],
        label: "Réveil week-end",
        active: true
      }
    ];
  }
  if (typeProfil === "travail") {
    return [
      {
        id: `al-${baseId}-work-1`,
        hour: 8,
        minute: 30,
        days: [0, 1, 2, 3, 4],
        label: "Travail",
        active: true
      }
    ];
  }
  return [];
}

// Fonction : ouvre la modale de configuration d'une alarme
function ouvrirModaleAlarme(alarme) {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalContent = document.getElementById("modal-content");
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = "";

  const theme = obtenirThemeCourant();
  const clair = theme === "light";
  const accent = obtenirAccentAlarme();

  const titre = document.createElement("h2");
  titre.className = "text-sm font-medium mb-3";
  titre.textContent = "Configurer l'alarme";

  const form = document.createElement("form");
  form.className = "space-y-3";

  const ligneHeure = document.createElement("div");
  ligneHeure.className = "flex gap-2";
  const inputHeure = document.createElement("input");
  inputHeure.type = "tel";
  inputHeure.inputMode = "numeric";
  inputHeure.value = alarme.hour;
  inputHeure.className = clair
    ? `w-1/2 bg-slate-100 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-1/2 bg-slate-800 rounded-xl border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-1 ${accent.ring}`;
  const inputMinute = document.createElement("input");
  inputMinute.type = "tel";
  inputMinute.inputMode = "numeric";
  inputMinute.value = alarme.minute;
  inputMinute.className = clair
    ? `w-1/2 bg-slate-100 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-1/2 bg-slate-800 rounded-xl border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-1 ${accent.ring}`;
  ligneHeure.appendChild(inputHeure);
  ligneHeure.appendChild(inputMinute);

  const inputLabel = document.createElement("input");
  inputLabel.type = "text";
  inputLabel.value = alarme.label || "";
  inputLabel.placeholder = "Libellé (optionnel)";
  inputLabel.className = clair
    ? `w-full bg-slate-100 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${accent.ring}`
    : `w-full bg-slate-800 rounded-xl border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-1 ${accent.ring}`;

  const paragraphJours = document.createElement("p");
  paragraphJours.className = clair ? "text-xs text-slate-600" : "text-xs text-slate-400";
  paragraphJours.textContent = "Jours de répétition";

  const badges = document.createElement("div");
  badges.className = "flex gap-1 flex-wrap";
  const noms = ["L", "M", "M", "J", "V", "S", "D"];
  const couleurs = [
    "text-sky-400",
    "text-emerald-400",
    "text-teal-400",
    "text-indigo-400",
    "text-amber-400",
    "text-orange-400",
    "text-rose-400"
  ];
  noms.forEach((nom, index) => {
    const boutonJour = document.createElement("button");
    boutonJour.type = "button";
    const actif = alarme.days.includes(index);
    const couleurJour = couleurs[index] || "";
    const baseClasses = `w-8 h-8 flex items-center justify-center rounded-full text-xs ${couleurJour}`;
    const baseInactif = clair ? "bg-slate-200" : "bg-slate-800";
    boutonJour.className = actif
      ? `${baseClasses} ${accent.bg}`
      : `${baseClasses} ${baseInactif}`;
    boutonJour.textContent = nom;
    boutonJour.dataset.index = String(index);
    boutonJour.addEventListener("click", () => {
      const idx = parseInt(boutonJour.dataset.index || "0", 10);
      if (alarme.days.includes(idx)) {
        alarme.days = alarme.days.filter((d) => d !== idx);
      } else {
        alarme.days.push(idx);
      }
      const estActif = alarme.days.includes(idx);
      boutonJour.classList.toggle(accent.bg, estActif);
      boutonJour.classList.toggle(baseInactif, !estActif);
    });
    badges.appendChild(boutonJour);
  });

  form.appendChild(ligneHeure);
  form.appendChild(inputLabel);
  form.appendChild(paragraphJours);
  form.appendChild(badges);

  const actions = document.createElement("div");
  actions.className = "flex justify-end gap-2 mt-4";

  const annuler = document.createElement("button");
  annuler.type = "button";
  annuler.className = clair
    ? "px-3 py-1.5 rounded-full text-xs text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400"
    : "px-3 py-1.5 rounded-full text-xs text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-slate-500";
  annuler.textContent = "Annuler";
  annuler.addEventListener("click", fermerModaleAlarme);

  const enregistrer = document.createElement("button");
  enregistrer.type = "submit";
  enregistrer.className = "px-3 py-1.5 rounded-full text-xs text-white";
  enregistrer.classList.add(accent.bg);
  enregistrer.textContent = "Enregistrer";

  actions.appendChild(annuler);
  actions.appendChild(enregistrer);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alarme.hour = Math.max(0, Math.min(23, parseInt(inputHeure.value || "0", 10)));
    alarme.minute = Math.max(0, Math.min(59, parseInt(inputMinute.value || "0", 10)));
    alarme.label = inputLabel.value || "Alarme";

    const etat = lireEtat();
    const idx = etat.alarmes.findIndex((a) => a.id === alarme.id);
    if (idx !== -1) {
      etat.alarmes[idx] = alarme;
      ecrireEtat(etat);
      rafraichirAlarmes();
    }
    fermerModaleAlarme();
  });

  modalContent.appendChild(titre);
  form.appendChild(actions);
  modalContent.appendChild(form);

  modalBackdrop.classList.remove("hidden");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

// Fonction : ferme la modale d'alarme
function fermerModaleAlarme() {
  const modalBackdrop = document.getElementById("modal-backdrop");
  if (!modalBackdrop) return;
  modalBackdrop.classList.add("hidden");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

// Fonction : vérifie régulièrement si une alarme doit sonner
function surveillerAlarmes() {
  setInterval(() => {
    const maintenant = new Date();
    const h = maintenant.getHours();
    const m = maintenant.getMinutes();
    const jour = (maintenant.getDay() + 6) % 7;

    const etat = lireEtat();
    etat.alarmes.forEach((alarme) => {
      if (!alarme.active) return;
      if (alarme.hour === h && alarme.minute === m) {
        if (alarme.days.length === 0 || alarme.days.includes(jour)) {
          declencherAlarme(alarme);
        }
      }
    });
  }, 30000);
}

// Fonction : déclenche une alarme (notification + son simple)
function declencherAlarme(alarme) {
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const telephoneAllume = prefs.telephoneAllume === true;
  if (!telephoneAllume) return;
  const sonsActifs = prefs.sonsActifs !== false;
  const vibrationsActives = prefs.vibrationsActives !== false;
  const notificationsActives = prefs.notificationsActives !== false;

  if (notificationsActives && "Notification" in window && Notification.permission === "granted") {
    const options = {
      body: alarme.label || "Votre alarme sonne !",
      icon: "icons/icon-192.png"
    };
    if (vibrationsActives) {
      options.vibrate = [200, 100, 200];
    }
    new Notification("Alarme", options);
  }

  if (sonsActifs) {
    const audio = new Audio("sounds/alarme.wav");
    audio.play().catch(() => {});
  }

  if (vibrationsActives && navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }

  afficherToast(alarme.label || "Votre alarme sonne !", "alarm");
}

// Fonction : demande la permission de notification au besoin
function demanderPermissionNotification() {
  if (!("Notification" in window)) return;
  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const notificationsActives = prefs.notificationsActives !== false;
  if (!notificationsActives) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

// Fonction : initialise l'onglet alarmes
export function initialiserAlarmes() {
  demanderPermissionNotification();
  rafraichirAlarmes();
  surveillerAlarmes();

  setInterval(() => {
    rafraichirAlarmes();
  }, 60000);

  const boutonAjouter = document.getElementById("add-alarm");
  if (boutonAjouter) {
    boutonAjouter.addEventListener("click", () => {
      const etat = lireEtat();
      const nouvelle = creerAlarmeParDefaut();
      etat.alarmes.push(nouvelle);
      ecrireEtat(etat);
      rafraichirAlarmes();
      ouvrirModaleAlarme(nouvelle);
      afficherToast("Alarme créée", "success");
    });
  }

  const profils = document.getElementById("alarm-profiles");
  if (profils) {
    profils.addEventListener("click", (event) => {
      const cible = event.target;
      const bouton = cible.closest("button[data-profile]");
      if (!bouton) return;
      const typeProfil = bouton.getAttribute("data-profile");
      if (!typeProfil) return;
      const etat = lireEtat();
      const nouvelles = creerAlarmeDepuisProfil(typeProfil);
      if (nouvelles.length === 0) return;
      nouvelles.forEach((nouvelle) => {
        const existeDeja = etat.alarmes.some((a) => {
          return (
            a.hour === nouvelle.hour &&
            a.minute === nouvelle.minute &&
            a.label === nouvelle.label &&
            Array.isArray(a.days) &&
            a.days.length === nouvelle.days.length &&
            a.days.every((d) => nouvelle.days.includes(d))
          );
        });
        if (!existeDeja) {
          etat.alarmes.push(nouvelle);
        }
      });
      ecrireEtat(etat);
      rafraichirAlarmes();
      afficherToast("Profil d'alarmes ajouté", "success");
    });
  }

  const liste = document.getElementById("alarm-list");
  if (liste) {
    liste.addEventListener("click", (event) => {
      const cible = event.target;
      const article = cible.closest("article[data-id]");
      if (!article) return;
      const id = article.dataset.id;
      const etat = lireEtat();
      const alarme = etat.alarmes.find((a) => a.id === id);
      if (!alarme) return;

      const boutonToggle = cible.closest("button[data-action=\"toggle-alarme\"]");
      const boutonSupprimer = cible.closest("button[data-action=\"supprimer-alarme\"]");

      if (boutonSupprimer) {
        const libelle = alarme.label && alarme.label.trim().length > 0 ? alarme.label : "Alarme";
        etat.alarmes = etat.alarmes.filter((a) => a.id !== id);
        ecrireEtat(etat);
        rafraichirAlarmes();
        afficherToast(`${libelle} supprimée`, "silent");
        return;
      }

      if (boutonToggle) {
        alarme.active = !alarme.active;
        ecrireEtat(etat);
        rafraichirAlarmes();
        return;
      }

      ouvrirModaleAlarme(alarme);
    });
  }
}
