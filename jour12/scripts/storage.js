const STORAGE_VERSION = 1;
const STORAGE_KEY = "horloge-android-pwa";

// Fonction : récupère l'état complet depuis localStorage
export function lireEtat() {
  try {
    const brut = localStorage.getItem(STORAGE_KEY);
    if (!brut) {
      return creerEtatInitial();
    }
    const data = JSON.parse(brut);
    if (!data.version || data.version !== STORAGE_VERSION) {
      return migrerEtat(data);
    }
    return data;
  } catch (e) {
    return creerEtatInitial();
  }
}

// Fonction : sauvegarde l'état complet dans localStorage
export function ecrireEtat(etat) {
  const aSauver = { ...etat, version: STORAGE_VERSION };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(aSauver));
}

// Fonction : crée un état initial vide
function creerEtatInitial() {
  return {
    version: STORAGE_VERSION,
    horloges: [],
    alarmes: [],
    timers: [],
    chronometres: [],
    preferences: {
      format24h: true,
      locale: "fr-FR",
      theme: "dark",
      accent: "sky",
      sonsActifs: true,
      vibrationsActives: true,
      notificationsActives: true,
      telephoneAllume: false
    }
  };
}

// Fonction : migre un ancien état vers la version courante
function migrerEtat(ancien) {
  const base = creerEtatInitial();
  return {
    ...base,
    ...ancien,
    version: STORAGE_VERSION
  };
}
