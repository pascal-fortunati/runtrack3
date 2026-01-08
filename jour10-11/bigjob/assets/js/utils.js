export const EMAIL_DOMAIN = "@laplateforme.io";

// Fonction pour valider le domaine d'email
export function validateEmailDomain(email) {
  const lower = String(email).trim().toLowerCase();
  return lower.endsWith(EMAIL_DOMAIN);
}

// Fonction pour hacher le mot de passe avec bcrypt
export async function hashPassword(password) {
  const b = window?.dcodeIO?.bcrypt;
  if (!b) throw new Error("bcrypt indisponible");
  return new Promise((resolve, reject) => {
    b.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      b.hash(String(password), salt, (err2, hash) => {
        if (err2) return reject(err2);
        resolve(hash);
      });
    });
  });
}

// Fonction pour comparer un mot de passe avec un hash bcrypt
export async function comparePassword(password, hash) {
  const b = window?.dcodeIO?.bcrypt;
  if (!b) throw new Error("bcrypt indisponible");
  return new Promise((resolve, reject) => {
    b.compare(String(password), String(hash), (err, res) => {
      if (err) return reject(err);
      resolve(!!res);
    });
  });
}

// Fonction pour obtenir la date d'aujourd'hui au format ISO
export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Fonction pour vérifier si une date est passée
export function isDatePast(isoDate) {
  const t = new Date(todayISO());
  const d = new Date(isoDate);
  return d < t;
}

// Fonction pour formater une date en français
export function formatDateFR(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

// Fonction pour générer un identifiant unique
export function uid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

// Fonction pour obtenir les jours de la semaine en abbréviation
export function weekDays() {
  return ["L", "M", "M", "J", "V", "S", "D"];
}

// Fonction pour obtenir le libellé complet d'un mois en français
export function monthLabel(year, month) {
  const d = new Date(year, month, 1);
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
}

// Fonction pour échapper les caractères spéciaux dans une chaîne HTML
export function escapeHTML(value) {
  const s = String(value ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
