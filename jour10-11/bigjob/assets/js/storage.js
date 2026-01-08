import { uid } from "./utils.js";
import { idbGet, idbSet } from "./idb.js";

let DB = { users: [], requests: [], session: { userId: null, isLoggedIn: false } };
let DIR_HANDLE = null;
let USERS_HANDLE = null;
let REQUESTS_HANDLE = null;

// Fonction pour obtenir la base de données
export function getDB() { return DB; }

// Fonction pour définir la base de données
export async function setDB(db) {
  DB = db;
  try { localStorage.setItem("lap_db", JSON.stringify(DB)); } catch {}
  await persistAll();
}

// Fonction pour vérifier si le dossier JSON est connecté
export function isDirConnected() { return !!DIR_HANDLE; }

// Fonction pour lire le contenu d'un fichier JSON
async function readJSONFromURL(url, fallback) {
  try {
    const res = await fetch(url);
    const txt = await res.text();
    return txt ? JSON.parse(txt) : fallback;
  } catch { return fallback; }
}

// Fonction pour lire le contenu d'un fichier JSON à partir d'un handle
async function readJSON(handle, fallback) {
  try {
    const f = await handle.getFile();
    const txt = await f.text();
    return txt ? JSON.parse(txt) : fallback;
  } catch { return fallback; }
}

// Fonction pour connecter le dossier JSON
export async function connectJSONDir() {
  if (!window.showDirectoryPicker) return false;
  try {
    const opts = { startIn: 'documents' };
    DIR_HANDLE = await window.showDirectoryPicker(opts);
    USERS_HANDLE = await DIR_HANDLE.getFileHandle("users.json", { create: true });
    REQUESTS_HANDLE = await DIR_HANDLE.getFileHandle("requests.json", { create: true });
    try { await idbSet("dir", DIR_HANDLE); } catch {}
    await loadFromDir();
    await persistAll();
    return true;
  } catch { return false; }
}

// Fonction pour charger les données à partir du dossier JSON
export async function loadFromDir() {
  if (!USERS_HANDLE || !REQUESTS_HANDLE) return null;
  const usersSrc = await readJSON(USERS_HANDLE, []);
  const users = usersSrc.map((v) => ({ id: v.id || uid(), firstName: v.firstName, lastName: v.lastName, email: v.email, password: v.password, role: v.role || "user", createdAt: v.createdAt || new Date().toISOString() }));
  const requestsSrc = await readJSON(REQUESTS_HANDLE, []);
  const requests = [];
  for (const q of requestsSrc) {
    const id = q.id || uid();
    let userId = q.userId || null;
    const userEmail = q.userEmail || null;
    if (!userId && userEmail) {
      const u = users.find((x) => String(x.email).toLowerCase() === String(userEmail).toLowerCase());
      userId = u ? u.id : null;
    }
    if (!userId) continue;
    requests.push({ id, userId, userEmail, date: q.date, status: q.status || "pending", createdAt: q.createdAt || new Date().toISOString(), updatedAt: q.updatedAt || new Date().toISOString() });
  }
  DB = { users, requests, session: DB.session };
  try { localStorage.setItem("lap_db", JSON.stringify(DB)); } catch {}
  return DB;
}

// Fonction pour restaurer le handle du dossier JSON depuis IndexedDB
export async function restoreDirHandle() {
  try {
    const handle = await idbGet("dir");
    if (!handle) return false;
    const perm = (handle.queryPermission ? await handle.queryPermission({ mode: "readwrite" }) : "granted");
    if (perm !== "granted") return false;
    DIR_HANDLE = handle;
    USERS_HANDLE = await DIR_HANDLE.getFileHandle("users.json", { create: true });
    REQUESTS_HANDLE = await DIR_HANDLE.getFileHandle("requests.json", { create: true });
    await loadFromDir();
    return true;
  } catch { return false; }
}

// Fonction pour charger les données par défaut à partir des fichiers assets
export async function loadFromAssets() {
  try {
    const u = await readJSONFromURL("assets/db/users.json", []);
    const r = await readJSONFromURL("assets/db/requests.json", []);
    const users = (Array.isArray(u) ? u : []).map((v) => ({ id: v.id || uid(), firstName: v.firstName, lastName: v.lastName, email: v.email, password: v.password, role: v.role || "user", createdAt: v.createdAt || new Date().toISOString() }));
    const requests = [];
    for (const q of Array.isArray(r) ? r : []) {
      let userId = q.userId;
      if (!userId && q.userEmail) {
        const usr = users.find((x) => String(x.email).toLowerCase() === String(q.userEmail).toLowerCase());
        userId = usr ? usr.id : null;
      }
      if (!userId) continue;
      requests.push({ id: q.id || uid(), userId, userEmail: q.userEmail, date: q.date, status: q.status || "pending", createdAt: q.createdAt || new Date().toISOString(), updatedAt: q.updatedAt || new Date().toISOString() });
    }
    DB = { users, requests, session: DB.session };
    try { localStorage.setItem("lap_db", JSON.stringify(DB)); } catch {}
    return true;
  } catch { return false; }
}

// Fonction pour initialiser le stockage
export async function initStorage() {
  try {
    const raw = localStorage.getItem("lap_db");
    if (raw) {
      const obj = JSON.parse(raw);
      const users = Array.isArray(obj.users) ? obj.users : [];
      const requests = Array.isArray(obj.requests) ? obj.requests : [];
      const session = obj.session && typeof obj.session === "object" ? obj.session : { userId: null, isLoggedIn: false };
      DB = { users, requests, session };
    } else {
      DB = { users: [], requests: [], session: { userId: null, isLoggedIn: false } };
      try { localStorage.setItem("lap_db", JSON.stringify(DB)); } catch {}
    }
  } catch {
    DB = { users: [], requests: [], session: { userId: null, isLoggedIn: false } };
  }
  try { sessionStorage.setItem("lap_session", JSON.stringify(DB.session)); } catch {}
  return true;
}

// Fonction pour enregistrer les données dans le dossier JSON
async function persistAll() {
  try { localStorage.setItem("lap_db", JSON.stringify(DB)); } catch {}
  if (!DIR_HANDLE) return;
  try {
    if (!USERS_HANDLE) USERS_HANDLE = await DIR_HANDLE.getFileHandle("users.json", { create: true });
    if (!REQUESTS_HANDLE) REQUESTS_HANDLE = await DIR_HANDLE.getFileHandle("requests.json", { create: true });
    const wUsers = await USERS_HANDLE.createWritable();
    await wUsers.write(JSON.stringify(DB.users.map((u) => ({ id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email, password: u.password, role: u.role, createdAt: u.createdAt })), null, 2));
    await wUsers.close();
    const wReq = await REQUESTS_HANDLE.createWritable();
    await wReq.write(JSON.stringify(DB.requests.map((r) => ({ id: r.id, userId: r.userId, userEmail: r.userEmail, date: r.date, status: r.status, createdAt: r.createdAt, updatedAt: r.updatedAt })), null, 2));
    await wReq.close();
  } catch {}
}

// Fonction pour enregistrer la session dans le dossier JSON
export async function saveSession(session) {
  const db = getDB();
  db.session = session;
  try { sessionStorage.setItem("lap_session", JSON.stringify(session)); } catch {}
  await setDB(db);
}

// Fonction pour effacer la session dans le dossier JSON
export async function clearSession() {
  const db = getDB();
  db.session = { userId: null, isLoggedIn: false };
  try { sessionStorage.setItem("lap_session", JSON.stringify(db.session)); } catch {}
  await setDB(db);
}

// Fonction pour obtenir la session
export function getSession() {
  const db = getDB();
  try {
    const raw = sessionStorage.getItem("lap_session");
    if (raw) return JSON.parse(raw);
  } catch {}
  return db.session;
}

// Fonction pour lister tous les utilisateurs
export function listUsers() {
  const db = getDB();
  return db.users;
}

// Fonction pour trouver un utilisateur par email
export function findUserByEmail(email) {
  const db = getDB();
  const e = String(email).trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === e) || null;
}

// Fonction pour trouver un utilisateur par ID
export function findUserById(id) {
  const db = getDB();
  return db.users.find((u) => u.id === id) || null;
}

// Fonction pour créer un utilisateur
export async function createUser({ firstName, lastName, email, passwordHash, role = "user" }) {
  const db = getDB();
  const now = new Date().toISOString();
  const user = { id: uid(), firstName, lastName, email, password: passwordHash, role, createdAt: now };
  db.users.push(user);
  await setDB(db);
  return user;
}

// Fonction pour mettre à jour le rôle d'un utilisateur
export function updateUserRole(userId, role) {
  const db = getDB();
  const u = db.users.find((x) => x.id === userId);
  if (!u) return null;
  u.role = role;
  setDB(db);
  return u;
}

// Fonction pour supprimer un utilisateur
export function deleteUser(userId) {
  const db = getDB();
  db.users = db.users.filter((u) => u.id !== userId);
  db.requests = db.requests.filter((r) => r.userId !== userId);
  setDB(db);
}

// Fonction pour lister toutes les demandes
export function listRequests() {
  const db = getDB();
  return db.requests;
}

// Fonction pour lister toutes les demandes d'un utilisateur
export function listRequestsByUser(userId) {
  const db = getDB();
  return db.requests.filter((r) => r.userId === userId);
}

// Fonction pour créer une demande
export function createRequest({ userId, date }) {
  const db = getDB();
  const now = new Date().toISOString();
  const u = db.users.find((x) => x.id === userId);
  const req = { id: uid(), userId, userEmail: u ? u.email : undefined, date, status: "pending", createdAt: now, updatedAt: now };
  db.requests.push(req);
  setDB(db);
  return req;
}

// Fonction pour mettre à jour le statut d'une demande
export function updateRequestStatus(reqId, status) {
  const db = getDB();
  const r = db.requests.find((x) => x.id === reqId);
  if (!r) return null;
  r.status = status;
  r.updatedAt = new Date().toISOString();
  setDB(db);
  return r;
}

// Fonction pour supprimer une demande
export function deleteRequest(reqId) {
  const db = getDB();
  db.requests = db.requests.filter((r) => r.id !== reqId);
  setDB(db);
}