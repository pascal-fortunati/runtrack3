import { validateEmailDomain, hashPassword, comparePassword } from "./utils.js";
import { findUserByEmail, createUser, saveSession, clearSession, getSession, findUserById } from "./storage.js";

// Fonction d'inscription pour créer un nouveau compte utilisateur
export async function register({ firstName, lastName, email, password }) {
  const fn = String(firstName || "").trim();
  const ln = String(lastName || "").trim();
  const em = String(email || "").trim().toLowerCase();
  const pw = String(password || "").trim();
  if (!fn || !ln || !em || !pw) throw new Error("Champs requis");
  if (!validateEmailDomain(em)) throw new Error("Email non autorisé");
  if (findUserByEmail(em)) throw new Error("Email déjà enregistré");
  const passwordHash = await hashPassword(pw);
  const user = await createUser({ firstName: fn, lastName: ln, email: em, passwordHash });
  await saveSession({ userId: user.id, isLoggedIn: true });
  return user;
}

// Fonction de connexion pour accéder au dashboard et aux backoffice
export async function login({ email, password }) {
  const em = String(email || "").trim().toLowerCase();
  const pw = String(password || "").trim();
  if (!em || !pw) throw new Error("Champs requis");
  const user = findUserByEmail(em);
  if (!user) throw new Error("Identifiants invalides");
  const ok = await comparePassword(pw, user.password);
  if (!ok) throw new Error("Identifiants invalides");
  await saveSession({ userId: user.id, isLoggedIn: true });
  return user;
}

// Fonction de déconnexion pour fermer la session utilisateur
export function logout() {
  clearSession();
}

// Fonction pour récupérer l'utilisateur actuellement connecté
export function currentUser() {
  const session = getSession();
  if (!session || !session.isLoggedIn) return null;
  return findUserById(session.userId);
}

// Fonction pour vérifier si l'utilisateur est connecté
export function requireAuth() {
  const u = currentUser();
  return !!u;
}

// Fonction pour vérifier si l'utilisateur a le rôle requis
export function requireRole(roles) {
  const u = currentUser();
  if (!u) return false;
  const list = Array.isArray(roles) ? roles : [roles];
  return list.includes(u.role);
}