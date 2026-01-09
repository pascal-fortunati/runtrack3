import { lireEtat } from "./storage.js";

// Fonction : obtient ou crée le conteneur de toast pour afficher des messages
function obtenirConteneurToast() {
  const existant = document.getElementById("toast-container");
  if (existant) return existant;
  const phone = document.querySelector(".phone-shell");
  if (!phone) return null;
  const conteneur = document.createElement("div");
  conteneur.id = "toast-container";
  conteneur.className = "pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-center gap-2 z-40";
  phone.appendChild(conteneur);
  return conteneur;
}

// Fonction : affiche un toast avec un message et un type optionnel
export function afficherToast(message, type = "info") {
  const conteneur = obtenirConteneurToast();
  if (!conteneur) return;

  let theme = "dark";
  let notificationsActives = true;
  try {
    const etat = lireEtat();
    const prefs = etat.preferences || {};
    theme = prefs.theme || "dark";
    notificationsActives = prefs.notificationsActives !== false;
  } catch (e) {}

  if (!notificationsActives) {
    return;
  }
  
  // Création de l'élément toast
  const toast = document.createElement("div");

  if (theme === "light") {
    toast.className = "bg-white/95 border border-slate-300 text-xs text-slate-900 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-200";
  } else {
    toast.className = "bg-slate-900/95 border border-slate-700 text-xs text-slate-50 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-200";
  }

  // Ajout de l'icône correspondante au type de toast
  const icone = document.createElement("span");
  let accent = "text-sky-400";
  let symbole = "notifications";
  if (type === "success") {
    accent = "text-emerald-400";
    symbole = "check_circle";
  } else if (type === "alarm") {
    accent = "text-amber-400";
    symbole = "notifications_active";
  } else if (type === "error") {
    accent = "text-red-400";
    symbole = "error";
  }
  icone.className = `material-icons-outlined text-[14px] ${accent}`;
  icone.textContent = symbole;

  // Ajout du message de toast
  const texte = document.createElement("span");
  texte.textContent = message;

  toast.appendChild(icone);
  toast.appendChild(texte);

  conteneur.appendChild(toast);

  // Ajout d'une vibration si activé
  try {
    if (type !== "silent") {
      const etat = lireEtat();
      const prefs = etat.preferences || {};
      const sonsActifs = prefs.sonsActifs !== false;
      if (sonsActifs) {
        const audio = new Audio("sounds/notification.wav");
        audio.play().catch(() => {});
      }
    }
  } catch (e) {}

  // Animation d'apparition et disparition du toast
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  });

  // Animation de disparition du toast après 2.5 secondes
  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => {
      if (toast.parentElement === conteneur) {
        conteneur.removeChild(toast);
      }
    }, 200);
  }, 2500);
}