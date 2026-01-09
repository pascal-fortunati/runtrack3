import { demarrerBoot } from "./boot.js";
import { initialiserHorloge, appliquerThemeCartesHorloge } from "./clock.js";
import { initialiserAlarmes, appliquerThemeCartesAlarmes } from "./alarm.js";
import { initialiserTimers, appliquerThemeCartesTimers } from "./timer.js";
import { initialiserChronometres, appliquerThemeCartesChronos } from "./stopwatch.js";
import { lireEtat, ecrireEtat } from "./storage.js";
import { afficherToast } from "./toast.js";

let evenementInstall = null;
let panneauOuvert = false;
let glissementActif = false;
let departGlissementY = 0;
let dernierY = 0;
let sonBootDeclenche = false;
let accentCourant = "sky";

// Constantes pour les accents de couleur
const ACCENTS_TEXT = {
  sky: "text-sky-400",
  emerald: "text-emerald-400",
  rose: "text-rose-400"
};

// Constantes pour les accents de couleur de fond
const ACCENTS_BG = {
  sky: ["bg-sky-600", "hover:bg-sky-500"],
  emerald: ["bg-emerald-600", "hover:bg-emerald-500"],
  rose: ["bg-rose-600", "hover:bg-rose-500"]
};

// Constantes pour les accents de couleur de bordure
const ACCENTS_BORDER = {
  sky: "border-sky-500",
  emerald: "border-emerald-500",
  rose: "border-rose-500"
};

// Constantes pour les accents de couleur de focus ring
const ACCENTS_RING = {
  sky: "focus:ring-sky-400",
  emerald: "focus:ring-emerald-400",
  rose: "focus:ring-rose-400"
};

// Constantes pour les accents de couleur en hexadécimal
const ACCENTS_HEX = {
  sky: "#0ea5e9",
  emerald: "#059669",
  rose: "#e11d48"
};

// Constantes pour toutes les classes de couleur
const TOUTES_CLASSES_TEXT = ["text-sky-400", "text-emerald-400", "text-rose-400"];
const TOUTES_CLASSES_BG = [
  "bg-sky-600",
  "hover:bg-sky-500",
  "bg-emerald-600",
  "hover:bg-emerald-500",
  "bg-rose-600",
  "hover:bg-rose-500"
];

// Constantes pour toutes les classes de couleur de fond sans hover
const TOUTES_BG_SEULES = ["bg-sky-600", "bg-emerald-600", "bg-rose-600"];
const TOUTES_CLASSES_RING = ["focus:ring-sky-400", "focus:ring-emerald-400", "focus:ring-rose-400"];

// Fonction : applique l'accent sur l'interface utilisateur
function appliquerAccentSurUI(accent) {
  accentCourant = accent;
  const boutons = document.querySelectorAll("[data-accent=bg]");
  boutons.forEach((bouton) => {
    TOUTES_CLASSES_BG.forEach((cls) => bouton.classList.remove(cls));
    const classes = ACCENTS_BG[accent] || ACCENTS_BG.sky;
    classes.forEach((cls) => bouton.classList.add(cls));
    TOUTES_CLASSES_RING.forEach((cls) => bouton.classList.remove(cls));
    const ring = ACCENTS_RING[accent] || ACCENTS_RING.sky;
    bouton.classList.add(ring);
  });

  // Appliquer l'accent sur les onglets
  const actif = document.querySelector(".tab-button[aria-current=page]");
  if (actif && actif.dataset.tab) {
    activerOnglet(actif.dataset.tab);
  }

  // Appliquer l'accent sur les boutons de choix d'accent
  const choix = document.getElementById("accent-choices");
  if (choix) {
    const classeBordure = ACCENTS_BORDER[accent] || ACCENTS_BORDER.sky;
    choix.querySelectorAll("button[data-accent]").forEach((bouton) => {
      const type = bouton.getAttribute("data-accent");
      const estActif = type === accent;
      bouton.classList.remove("border-sky-500", "border-emerald-500", "border-rose-500");
      if (estActif) bouton.classList.add(classeBordure);
      bouton.classList.toggle("border-slate-600", !estActif);
      bouton.classList.remove("focus:ring-sky-500", "focus:ring-emerald-500", "focus:ring-rose-500");
      if (estActif) {
        if (accent === "emerald") bouton.classList.add("focus:ring-emerald-500");
        else if (accent === "rose") bouton.classList.add("focus:ring-rose-500");
        else bouton.classList.add("focus:ring-sky-500");
      }
    });
  }

  // Appliquer l'accent sur les cercles de timer
  const cercleTimers = document.querySelectorAll("[data-role=timer-circle]");
  cercleTimers.forEach((cercle) => {
    if (!(cercle instanceof SVGElement)) return;
    if (accent === "emerald") cercle.setAttribute("stroke", "#059669");
    else if (accent === "rose") cercle.setAttribute("stroke", "#e11d48");
    else cercle.setAttribute("stroke", "#0ea5e9");
  });

  // Appliquer l'accent sur l'écran de boot
  const boot = document.getElementById("boot-screen");
  if (boot) {
    // Appliquer l'accent sur le cercle interne de boot
    const inner = boot.querySelector(".w-24.h-24");
    if (inner) {
      inner.classList.remove("border-sky-500", "border-emerald-500", "border-rose-500");
      const bordure = ACCENTS_BORDER[accent] || ACCENTS_BORDER.sky;
      inner.classList.add(bordure);
    }
    // Appliquer l'accent sur la barre de progression
    const barre = boot.querySelector("#boot-progress");
    if (barre) {
      barre.classList.remove("bg-sky-500", "bg-emerald-500", "bg-rose-500");
      if (accent === "emerald") barre.classList.add("bg-emerald-500");
      else if (accent === "rose") barre.classList.add("bg-rose-500");
      else barre.classList.add("bg-sky-500");
    }
    // Appliquer l'accent sur le bouton de démarrage
    const boutonStart = document.getElementById("btn-start");
    if (boutonStart) {
      boutonStart.classList.remove("border-sky-500", "border-emerald-500", "border-rose-500", "border-slate-400");
      const bordureBtn = ACCENTS_BORDER[accent] || ACCENTS_BORDER.sky;
      boutonStart.classList.add(bordureBtn);
      boutonStart.classList.remove("focus:ring-sky-500", "focus:ring-emerald-500", "focus:ring-rose-500");
      const ringBtn = ACCENTS_RING[accent] || ACCENTS_RING.sky;
      boutonStart.classList.add(ringBtn);
    }
    // Appliquer l'accent sur le logo de boot
    const logoSvg = document.getElementById("boot-logo");
    if (logoSvg) {
      const fond = logoSvg.querySelector("rect");
      const hexLogo = ACCENTS_HEX[accent] || ACCENTS_HEX.sky;
      if (fond) {
        fond.setAttribute("fill", hexLogo);
      }
    }
  }

  // Appliquer l'accent sur les cartes d'alarme
  const cartesAlarmes = document.querySelectorAll("#alarm-list article");
  cartesAlarmes.forEach((article) => {
    const bouton = article.querySelector("button[data-action=\"toggle-alarme\"]");
    if (!bouton) return;
    bouton.classList.remove("bg-sky-600", "bg-emerald-600", "bg-rose-600");
    const actif = article.dataset.active === "true";
    if (!actif) return;
    if (accent === "emerald") bouton.classList.add("bg-emerald-600");
    else if (accent === "rose") bouton.classList.add("bg-rose-600");
    else bouton.classList.add("bg-sky-600");
  });

// Appliquer l'accent sur les badges de jours d'activation des alarmes
const classesAccentJours = ["bg-sky-600", "bg-emerald-600", "bg-rose-600"];
  const accentJour = (ACCENTS_BG[accent] || ACCENTS_BG.sky)[0];
  cartesAlarmes.forEach((article) => {
    const conteneurJours = article.querySelector('[data-role="alarme-jours"]');
    if (!conteneurJours) return;
    const badges = conteneurJours.querySelectorAll('[data-role="badge-jour"]');
    badges.forEach((badge) => {
      const estActif = classesAccentJours.some((cls) => badge.classList.contains(cls));
      badge.classList.remove("bg-sky-600", "bg-emerald-600", "bg-rose-600");
      if (estActif) badge.classList.add(accentJour);
    });
  });

  // Appliquer l'accent sur les boutons de démarrage des timers
  const boutonsStartTimers = document.querySelectorAll("#timer-list button[data-action=\"start-stop-timer\"]");
  boutonsStartTimers.forEach((btn) => {
    btn.classList.remove("bg-sky-600", "hover:bg-sky-500", "bg-emerald-600", "hover:bg-emerald-500", "bg-rose-600", "hover:bg-rose-500");
    if (accent === "emerald") btn.classList.add("bg-emerald-600", "hover:bg-emerald-500");
    else if (accent === "rose") btn.classList.add("bg-rose-600", "hover:bg-rose-500");
    else btn.classList.add("bg-sky-600", "hover:bg-sky-500");
  });

  // Appliquer l'accent sur les boutons de démarrage des chronomètres
  const boutonsStartChrono = document.querySelectorAll("#stopwatch-list button[data-action=\"start-stop-chrono\"]");
  boutonsStartChrono.forEach((btn) => {
    btn.classList.remove("bg-sky-600", "hover:bg-sky-500", "bg-emerald-600", "hover:bg-emerald-500", "bg-rose-600", "hover:bg-rose-500");
    if (accent === "emerald") btn.classList.add("bg-emerald-600", "hover:bg-emerald-500");
    else if (accent === "rose") btn.classList.add("bg-rose-600", "hover:bg-rose-500");
    else btn.classList.add("bg-sky-600", "hover:bg-sky-500");
  });
}

// Fonction : enregistre le service worker pour la fonctionnalité de push notifications
function enregistrerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

// Fonction : active un onglet de navigation
function activerOnglet(nom) {
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    const estActif = panel.id === `tab-${nom}`;
    panel.classList.toggle("hidden", !estActif);
  });

  // Appliquer l'accent sur les boutons de navigation
  const classeAccent = ACCENTS_TEXT[accentCourant] || ACCENTS_TEXT.sky;

  document.querySelectorAll(".tab-button").forEach((bouton) => {
    const estActif = bouton.dataset.tab === nom;
    TOUTES_CLASSES_TEXT.forEach((cls) => bouton.classList.remove(cls));
    bouton.classList.toggle(classeAccent, estActif);
    bouton.classList.toggle("text-slate-400", !estActif);
    bouton.setAttribute("aria-current", estActif ? "page" : "false");
  });
}

// Fonction : initialise les événements de la navigation
function initialiserNavigation() {
  const boutons = document.querySelectorAll(".tab-button");
  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const tab = bouton.dataset.tab;
      if (!tab) return;
      activerOnglet(tab);
    });
  });

  activerOnglet("clock");
}

// Fonction : applique le thème visuel de l'application
function appliquerTheme(theme) {
  // Appliquer l'accent sur le corps de la page
  const body = document.body;
  if (!body) return;
  if (theme === "light") {
    body.classList.remove("bg-slate-950", "text-slate-50");
    body.classList.add("bg-slate-100", "text-slate-900");
  } else {
    body.classList.remove("bg-slate-100", "text-slate-900");
    body.classList.add("bg-slate-950", "text-slate-50");
  }
  // Appliquer l'accent sur le meta theme-color
  const metaTheme = document.querySelector("meta[name=theme-color]");
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "light" ? "#f9fafb" : "#020617");
  }
}

// Fonction : applique le thème visuel sur la structure de l'application
function appliquerThemeSurStructure(theme) {
  const phone = document.getElementById("phone-shell");
  const quick = document.getElementById("quick-settings-panel");
  const header = document.getElementById("app-header");
  const main = document.getElementById("tab-container");
  const nav = document.getElementById("bottom-nav");
  const modal = document.getElementById("modal-content");
  const boot = document.getElementById("boot-screen");
  const titresSections = document.querySelectorAll("#tab-container h2");
  const profilsAlarmes = document.getElementById("alarm-profiles");
  const accentChoices = document.getElementById("accent-choices");
  const timerList = document.getElementById("timer-list");
  const alarmList = document.getElementById("alarm-list");
  const worldClockList = document.getElementById("world-clock-list");
  const stopwatchList = document.getElementById("stopwatch-list");

  if (theme === "light") {
    if (phone) {
      phone.classList.remove("bg-slate-700");
      phone.classList.add("bg-white");
    }
    if (quick) {
      quick.classList.remove("bg-slate-900/95", "border-slate-700", "bg-white/95", "border-slate-200");
      quick.classList.add("bg-white/95", "border-slate-200");
      const label = quick.querySelector("span.text-xs");
      if (label) {
        label.classList.remove("text-slate-300", "text-slate-400", "text-slate-600");
        label.classList.add("text-slate-600");
      }
      const clock = document.getElementById("quick-settings-clock");
      if (clock) {
        clock.classList.remove("text-slate-300", "text-slate-400", "text-slate-500");
        clock.classList.add("text-slate-500");
      }
    }
    if (header) {
      header.classList.remove("bg-slate-900");
      header.classList.add("bg-white");
    }
    if (main) {
      main.classList.remove("bg-slate-900", "bg-slate-50", "bg-slate-100");
      main.classList.add("bg-white");
    }
    if (nav) {
      nav.classList.remove("bg-slate-900/95", "border-slate-800", "bg-white/95", "border-slate-200");
      nav.classList.add("bg-white/95", "border-slate-200");
    }
    if (modal) {
      modal.classList.remove("bg-slate-900", "border-slate-700");
      modal.classList.add("bg-white", "border-slate-300");
    }
    titresSections.forEach((titre) => {
      titre.classList.remove("text-slate-200");
      titre.classList.add("text-slate-900");
    });
    if (profilsAlarmes) {
      profilsAlarmes.querySelectorAll("button[data-profile]").forEach((btn) => {
        btn.classList.remove("bg-slate-800", "border-slate-600", "hover:bg-slate-700", "text-slate-300");
        btn.classList.add("bg-slate-100", "border-slate-300", "hover:bg-slate-200", "text-slate-800");
      });
    }
    if (accentChoices) {
      accentChoices.querySelectorAll("button[data-accent]").forEach((btn) => {
        btn.classList.remove("bg-slate-800", "bg-slate-100");
        btn.classList.add("bg-slate-100");
      });
    }
    if (timerList) {
      timerList.querySelectorAll('button[data-action="reset-timer"]').forEach((btn) => {
        btn.classList.remove("bg-slate-700", "text-white", "hover:bg-slate-600", "bg-slate-200", "text-slate-800", "hover:bg-slate-300");
        btn.classList.add("bg-slate-200", "text-slate-800", "hover:bg-slate-300");
      });
      timerList.querySelectorAll('button[data-action="supprimer-timer"]').forEach((btn) => {
        btn.classList.remove("text-slate-400", "hover:text-red-400", "hover:bg-slate-700", "text-slate-500", "hover:bg-slate-100");
        btn.classList.add("text-slate-500", "hover:text-red-500", "hover:bg-slate-100");
      });
    }
    if (alarmList) {
      alarmList.querySelectorAll('button[data-action="supprimer-alarme"]').forEach((btn) => {
        btn.classList.remove("text-slate-400", "hover:text-red-400", "hover:bg-slate-700", "text-slate-500", "hover:bg-slate-100");
        btn.classList.add("text-slate-500", "hover:text-red-500", "hover:bg-slate-100");
      });
    }
    if (worldClockList) {
      worldClockList.querySelectorAll('button[data-action="supprimer-horloge"]').forEach((btn) => {
        btn.classList.remove("text-slate-400", "hover:text-red-400", "hover:bg-slate-700", "text-slate-500", "hover:bg-slate-100");
        btn.classList.add("text-slate-500", "hover:text-red-500", "hover:bg-slate-100");
      });
    }
    if (stopwatchList) {
      stopwatchList.querySelectorAll('button[data-action="lap-chrono"]').forEach((btn) => {
        btn.classList.remove(
          "bg-slate-700",
          "text-white",
          "hover:bg-slate-600",
          "bg-slate-200",
          "text-slate-800",
          "hover:bg-slate-300"
        );
        btn.classList.add("bg-slate-200", "text-slate-800", "hover:bg-slate-300");
      });
      stopwatchList.querySelectorAll('button[data-action="reset-chrono"]').forEach((btn) => {
        btn.classList.remove(
          "bg-slate-700",
          "text-white",
          "hover:bg-slate-600",
          "bg-slate-200",
          "text-slate-800",
          "hover:bg-slate-300"
        );
        btn.classList.add("bg-slate-200", "text-slate-800", "hover:bg-slate-300");
      });
      stopwatchList.querySelectorAll('button[data-action="supprimer-chrono"]').forEach((btn) => {
        btn.classList.remove("text-slate-400", "hover:text-red-400", "hover:bg-slate-700", "text-slate-500", "hover:bg-slate-100");
        btn.classList.add("text-slate-500", "hover:text-red-500", "hover:bg-slate-100");
      });
    }
  } else {
    if (phone) {
      phone.classList.remove("bg-white");
      phone.classList.add("bg-slate-900");
      phone.classList.remove("border-slate-300", "border-slate-600", "border-slate-700", "border-slate-900");
      phone.classList.add("border-slate-800");
    }
    if (quick) {
      quick.classList.remove("bg-white/95", "border-slate-200");
      quick.classList.add("bg-slate-900/95", "border-slate-700");
      const label = quick.querySelector("span.text-xs");
      if (label) {
        label.classList.remove("text-slate-600", "text-slate-400");
        label.classList.add("text-slate-300");
      }
      const clock = document.getElementById("quick-settings-clock");
      if (clock) {
        clock.classList.remove("text-slate-500", "text-slate-300");
        clock.classList.add("text-slate-400");
      }
    }
    if (header) {
      header.classList.remove("bg-white");
      header.classList.add("bg-slate-900");
    }
    if (main) {
      main.classList.remove("bg-white");
      main.classList.add("bg-slate-900");
    }
    if (nav) {
      nav.classList.remove("bg-white/95", "border-slate-200");
      nav.classList.add("bg-slate-900/95", "border-slate-800");
    }
    if (modal) {
      modal.classList.remove("bg-white", "border-slate-300");
      modal.classList.add("bg-slate-900", "border-slate-700");
    }
    titresSections.forEach((titre) => {
      titre.classList.remove("text-slate-900");
      titre.classList.add("text-slate-200");
    });
    if (profilsAlarmes) {
      profilsAlarmes.querySelectorAll("button[data-profile]").forEach((btn) => {
        btn.classList.remove("bg-slate-100", "border-slate-300", "hover:bg-slate-200", "text-slate-800");
        btn.classList.add("bg-slate-800", "border-slate-600", "hover:bg-slate-700", "text-slate-300");
      });
    }
    if (accentChoices) {
      accentChoices.querySelectorAll("button[data-accent]").forEach((btn) => {
        btn.classList.remove("bg-slate-100");
        btn.classList.add("bg-slate-800");
      });
    }
    if (timerList) {
      timerList.querySelectorAll('button[data-action="reset-timer"]').forEach((btn) => {
        btn.classList.remove("bg-slate-200", "text-slate-800", "hover:bg-slate-300", "bg-slate-700", "text-white", "hover:bg-slate-600");
        btn.classList.add("bg-slate-700", "text-white", "hover:bg-slate-600");
      });
      timerList.querySelectorAll('button[data-action="supprimer-timer"]').forEach((btn) => {
        btn.classList.remove("text-slate-500", "hover:text-red-500", "hover:bg-slate-100", "text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
        btn.classList.add("text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
      });
    }
    if (alarmList) {
      alarmList.querySelectorAll('button[data-action="supprimer-alarme"]').forEach((btn) => {
        btn.classList.remove("text-slate-500", "hover:text-red-500", "hover:bg-slate-100", "text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
        btn.classList.add("text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
      });
    }
    if (worldClockList) {
      worldClockList.querySelectorAll('button[data-action="supprimer-horloge"]').forEach((btn) => {
        btn.classList.remove("text-slate-500", "hover:text-red-500", "hover:bg-slate-100", "text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
        btn.classList.add("text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
      });
    }
    if (stopwatchList) {
      stopwatchList.querySelectorAll('button[data-action="lap-chrono"]').forEach((btn) => {
        btn.classList.remove(
          "bg-slate-200",
          "text-slate-800",
          "hover:bg-slate-300",
          "bg-slate-700",
          "text-white",
          "hover:bg-slate-600"
        );
        btn.classList.add("bg-slate-700", "text-white", "hover:bg-slate-600");
      });
      stopwatchList.querySelectorAll('button[data-action="reset-chrono"]').forEach((btn) => {
        btn.classList.remove(
          "bg-slate-200",
          "text-slate-800",
          "hover:bg-slate-300",
          "bg-slate-700",
          "text-white",
          "hover:bg-slate-600"
        );
        btn.classList.add("bg-slate-700", "text-white", "hover:bg-slate-600");
      });
      stopwatchList.querySelectorAll('button[data-action="supprimer-chrono"]').forEach((btn) => {
        btn.classList.remove("text-slate-500", "hover:text-red-500", "hover:bg-slate-100", "text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
        btn.classList.add("text-slate-400", "hover:text-red-400", "hover:bg-slate-700");
      });
    }
  }
}

// Fonction : met à jour les toggles de préférences dans le panneau de paramètres
function mettreAJourToggles(prefs) {
  const panneau = document.getElementById("quick-settings-panel");
  if (!panneau) return;
  const toggles = panneau.querySelectorAll(".qs-toggle");
  const accentBg = (ACCENTS_BG[accentCourant] || ACCENTS_BG.sky)[0];
  const theme = prefs.theme || "dark";
  toggles.forEach((bouton) => {
    const type = bouton.dataset.toggle;
    let actif = false;
    if (type === "theme") {
      actif = (prefs.theme || "dark") === "dark";
    } else if (type === "sound") {
      actif = prefs.sonsActifs !== false;
    } else if (type === "vibration") {
      actif = prefs.vibrationsActives !== false;
    } else if (type === "notifications") {
      actif = prefs.notificationsActives !== false;
    }
    TOUTES_BG_SEULES.forEach((cls) => bouton.classList.remove(cls));
    bouton.classList.remove("bg-slate-800", "bg-slate-200", "bg-white");
    bouton.classList.remove("text-white", "text-slate-200", "text-slate-700", "text-slate-800", "text-slate-900");
    if (actif) {
      bouton.classList.add(accentBg, "text-white");
    } else {
      if (theme === "light") {
        bouton.classList.add("bg-slate-200", "text-slate-800");
      } else {
        bouton.classList.add("bg-slate-800", "text-slate-200");
      }
    }

    // Appliquer l'accent sur l'icone du toggle
    const icone = bouton.querySelector(".material-icons-outlined");
    if (icone) {
      TOUTES_CLASSES_TEXT.forEach((cls) => icone.classList.remove(cls));
      if (actif) {
        const classeTexte = ACCENTS_TEXT[accentCourant] || ACCENTS_TEXT.sky;
        icone.classList.add(classeTexte);
      } else if (theme === "light") {
        icone.classList.add("text-slate-500");
      }
    }
  });
}

// Fonction : ouvre le panneau de paramètres
function ouvrirPanneau() {
  const panneau = document.getElementById("quick-settings-panel");
  if (!panneau) return;
  panneau.classList.remove("-translate-y-full");
  panneau.classList.add("translate-y-0");
  panneauOuvert = true;
}

// Fonction : ferme le panneau de paramètres
function fermerPanneau() {
  const panneau = document.getElementById("quick-settings-panel");
  if (!panneau) return;
  panneau.classList.remove("translate-y-0");
  panneau.classList.add("-translate-y-full");
  panneauOuvert = false;
}

// Appliquer l'accent sur le son de la sidebar
function jouerSonSidebar() {
  try {
    const etat = lireEtat();
    const prefs = etat.preferences || {};
    const sonsActifs = prefs.sonsActifs !== false;
    if (!sonsActifs) return;
    const audio = new Audio("sounds/sidebarhaut.wav");
    audio.play().catch(() => {});
  } catch (e) {}
}

// Appliquer l'accent sur le son de démarrage de l'application
function initialiserSonBoot() {
  const bouton = document.getElementById("btn-start");
  const boutonsChassis = document.querySelectorAll("[data-role=phone-button-power]");
  if (!bouton && !boutonsChassis.length) return;

  const handler = async () => {
    if (sonBootDeclenche) return;
    sonBootDeclenche = true;
    const hint = document.getElementById("boot-hint");
    if (hint) hint.classList.add("hidden");
    if (bouton) bouton.classList.add("hidden");
    try {
      const etat = lireEtat();
      const prefs = etat.preferences || {};
      const sonsActifs = prefs.sonsActifs !== false;
      if (sonsActifs) {
        const ecran = document.getElementById("boot-screen");
        if (ecran && ecran.style.display !== "none") {
          const audio = new Audio("sounds/boot.wav");
          audio.play().catch(() => {});
        }
      }
    } catch (e) {}
    await demarrerBoot();
    try {
      const etatApresBoot = lireEtat();
      const prefsApresBoot = etatApresBoot.preferences || {};
      prefsApresBoot.telephoneAllume = true;
      etatApresBoot.preferences = prefsApresBoot;
      ecrireEtat(etatApresBoot);
    } catch (e) {}
  };

  if (bouton) {
    bouton.addEventListener("click", handler, { once: true });
  }
  boutonsChassis.forEach((btn) => {
    btn.addEventListener("click", handler, { once: true });
  });
}

// Fonction : initialise les événements de la zone de glissement du panneau de paramètres
function initialiserQuickSettings() {
  const panneau = document.getElementById("quick-settings-panel");
  const handle = document.getElementById("quick-settings-handle");
  if (!panneau || !handle) return;

  const etat = lireEtat();
  const prefs = etat.preferences || {};
  const theme = prefs.theme || "dark";
  const accent = prefs.accent || "sky";
  appliquerAccentSurUI(accent);
  appliquerTheme(theme);
  appliquerThemeSurStructure(theme);
  appliquerThemeCartesHorloge(theme);
  appliquerThemeCartesAlarmes(theme);
  appliquerThemeCartesTimers(theme);
  appliquerThemeCartesChronos(theme);
  mettreAJourToggles(prefs);

  // Fonction : gère la fin du glissement de la zone de glissement du panneau de paramètres
  function finGlissement() {
    if (!glissementActif) return;
    glissementActif = false;
    document.removeEventListener("pointermove", gererGlissement);
    document.removeEventListener("pointerup", finGlissement);
    const delta = dernierY - departGlissementY;
    if (Math.abs(delta) < 10) {
      if (panneauOuvert) {
        fermerPanneau();
      } else {
        ouvrirPanneau();
      }
      jouerSonSidebar();
      return;
    }
    if (delta > 0) {
      ouvrirPanneau();
    } else {
      fermerPanneau();
    }
    jouerSonSidebar();
  }

  // Fonction : gère le glissement de la zone de glissement du panneau de paramètres
  function gererGlissement(event) {
    if (!glissementActif) return;
    const point = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    dernierY = point.clientY;
  }

  // Fonction : gère le début du glissement de la zone de glissement du panneau de paramètres
  function debutGlissement(event) {
    const point = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    glissementActif = true;
    departGlissementY = point.clientY;
    dernierY = departGlissementY;
    document.addEventListener("pointermove", gererGlissement);
    document.addEventListener("pointerup", finGlissement);
  }

  // Appliquer l'accent sur la zone de glissement du panneau de paramètres
  const zone = handle.querySelector("div") || handle;
  zone.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    debutGlissement(event);
  });

  // Appliquer l'accent sur le clic sur le panneau de paramètres
  panneau.addEventListener("pointerdown", (event) => {
    const targetToggle = event.target.closest(".qs-toggle");
    if (targetToggle) return;
    const rect = panneau.getBoundingClientRect();
    const yLocal = event.clientY - rect.top;
    if (yLocal > 56) return;
    event.preventDefault();
    debutGlissement(event);
  });
  
  // Appliquer l'accent sur le clic sur les boutons de toggle du panneau de paramètres
  panneau.addEventListener("click", (event) => {
    const bouton = event.target.closest(".qs-toggle");
    if (!bouton) return;
    const type = bouton.dataset.toggle;
    const etatActuel = lireEtat();
    const prefsActuelles = etatActuel.preferences || {};
    let nouveau = { ...prefsActuelles };
    if (type === "theme") {
      const actuel = nouveau.theme || "dark";
      const suivant = actuel === "dark" ? "light" : "dark";
      nouveau.theme = suivant;
      appliquerTheme(suivant);
      appliquerThemeSurStructure(suivant);
      appliquerThemeCartesHorloge(suivant);
      appliquerThemeCartesAlarmes(suivant);
      appliquerThemeCartesTimers(suivant);
      appliquerThemeCartesChronos(suivant);
      afficherToast(suivant === "dark" ? "Thème sombre activé" : "Thème clair activé", "info");
    } else if (type === "sound") {
      const courant = nouveau.sonsActifs !== false;
      nouveau.sonsActifs = !courant;
      afficherToast(nouveau.sonsActifs ? "Son activé" : "Son désactivé", "info");
    } else if (type === "vibration") {
      const courant = nouveau.vibrationsActives !== false;
      nouveau.vibrationsActives = !courant;
      afficherToast(nouveau.vibrationsActives ? "Vibration activée" : "Vibration désactivée", "info");
      if (nouveau.vibrationsActives && navigator.vibrate) {
        navigator.vibrate(50);
      }
    } else if (type === "notifications") {
      const courant = nouveau.notificationsActives !== false;
      nouveau.notificationsActives = !courant;
      afficherToast(nouveau.notificationsActives ? "Notifications activées" : "Notifications désactivées", "info");
      if (nouveau.notificationsActives && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then((resultat) => {
          if (resultat !== "granted") {
            const etatMisAJour = lireEtat();
            const prefsMaj = etatMisAJour.preferences || {};
            prefsMaj.notificationsActives = false;
            etatMisAJour.preferences = prefsMaj;
            ecrireEtat(etatMisAJour);
            mettreAJourToggles(prefsMaj);
          }
        });
      }
    }
    etatActuel.preferences = nouveau;
    ecrireEtat(etatActuel);
    mettreAJourToggles(nouveau);
  });

  // Appliquer l'accent sur le clic sur les boutons de choix d'accent du panneau de paramètres
  const choixAccent = document.getElementById("accent-choices");
  if (choixAccent) {
    choixAccent.addEventListener("click", (event) => {
      const bouton = event.target.closest("button[data-accent]");
      if (!bouton) return;
      const accent = bouton.getAttribute("data-accent");
      if (!accent) return;
      const etatActuel = lireEtat();
      const prefsActuelles = etatActuel.preferences || {};
      prefsActuelles.accent = accent;
      etatActuel.preferences = prefsActuelles;
      ecrireEtat(etatActuel);
      appliquerAccentSurUI(accent);
      mettreAJourToggles(prefsActuelles);
      afficherToast("Couleur d'accent mise à jour", "info");
    });
  }

  // Fonction : ferme le panneau de paramètres si un clic est effectué en dehors de celui-ci
  document.addEventListener("pointerdown", (event) => {
    if (!panneauOuvert) return;
    const cible = event.target;
    if (!cible) return;
    if (cible.closest("#quick-settings-panel") || cible.closest("#quick-settings-handle")) {
      return;
    }
    fermerPanneau();
  });
}

// Fonction : initialise l'installation de l'application
function initialiserInstallation() {
  const boutonInstall = document.getElementById("install-button");
  if (!boutonInstall) return;

  // Appliquer l'accent sur l'événement de préinstallation de l'application
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    evenementInstall = event;
    boutonInstall.classList.remove("hidden");
  });

  // Appliquer l'accent sur le clic sur le bouton d'installation de l'application
  boutonInstall.addEventListener("click", async () => {
    if (!evenementInstall) return;
    evenementInstall.prompt();
    const choix = await evenementInstall.userChoice;
    if (choix.outcome === "accepted") {
      boutonInstall.classList.add("hidden");
    }
    evenementInstall = null;
  });

  window.addEventListener("appinstalled", () => {
    if (boutonInstall) boutonInstall.classList.add("hidden");
  });
}

// Fonction : démarre l'application en initialisant les composants et en démarrant le boot
async function demarrerApplication() {
  enregistrerServiceWorker();
  try {
    const etatInitial = lireEtat();
    const prefsInitiales = etatInitial.preferences || {};
    prefsInitiales.telephoneAllume = false;
    etatInitial.preferences = prefsInitiales;
    ecrireEtat(etatInitial);
  } catch (e) {}
  initialiserNavigation();
  initialiserInstallation();
  initialiserHorloge();
  initialiserAlarmes();
  initialiserTimers();
  initialiserChronometres();

	 initialiserQuickSettings();

	 initialiserSonBoot();
}

document.addEventListener("DOMContentLoaded", () => {
  demarrerApplication().catch(() => {
    const ecran = document.getElementById("boot-screen");
    if (ecran) {
      ecran.style.display = "none";
    }
  });
});
