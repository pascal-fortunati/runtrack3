import { requireAuth, requireRole, currentUser, logout } from "./auth.js";
import { isDirConnected } from "./storage.js";
import { showToast } from "./toast.js";

// Fonction pour enregistrer une route dans le routeur
const routes = {};
let appEl = null;
let navEl = null;

// Gestion du dark mode
function initDarkMode() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }
}

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark);
}

// Fonction pour enregistrer une route dans le routeur
export function registerRoute(path, component, options = {}) {
  routes[path] = { component, options };
}

// Fonction pour monter l'application dans un élément DOM et configurer le routeur
export function mountApp(rootSelector = "#app", navSelector = "#nav") {
  appEl = document.querySelector(rootSelector);
  navEl = document.querySelector(navSelector);
  initDarkMode();
}

// Fonction pour naviguer vers une route donnée
export function navigate(path) {
  if (!path.startsWith("#/")) location.hash = `#${path}`;
  else location.hash = path;
}

// Fonction pour afficher le menu de navigation
function renderNav() {
  if (!navEl) return;
  const u = currentUser();
  const path = (location.hash || "#/").replace(/^#/, "");
  
  const isActive = (href) => {
    const active = href.replace(/^#/, "") === path;
    return active 
      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
  };
  
  const link = (href, label) => 
    `<a href="${href}" class="px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(href)}">
      ${label}
    </a>`;
  
  const roleBadge = (role) => {
    const map = { 
      user: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", 
      moderator: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300", 
      admin: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" 
    };
    const cls = map[role] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    return `<span class="px-3 py-1 rounded-full text-xs font-semibold ${cls}">${role}</span>`;
  };
  const dbBadge = () => {
    const connected = isDirConnected();
    const cls = connected
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    const label = connected ? "DB connectée" : "DB locale";
    return `<span class="px-3 py-1 rounded-full text-xs font-semibold ${cls}">${label}</span>`;
  };
  
  const darkModeBtn = `
    <button id="darkModeBtn" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all" title="Toggle dark mode">
      <svg class="w-5 h-5 text-gray-700 dark:text-gray-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
      <svg class="w-5 h-5 text-gray-700 dark:text-gray-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
    </button>
  `;
  
  const leftItems = [];
  const rightItems = [];
  
  if (!u) {
    leftItems.push(link("#/connectdb", "Base de données"));
    rightItems.push(link("#/login", "Connexion"));
    rightItems.push(link("#/register", "Inscription"));
  } else {
    if (u.role === "user") leftItems.push(link("#/dashboard", "Dashboard"));
    if (u.role === "moderator") leftItems.push(link("#/moderator", "Backoffice"));
    if (u.role === "admin") leftItems.push(link("#/admin", "Administration"));
    if (!isDirConnected()) leftItems.push(link("#/connectdb", "Base"));
    
    rightItems.push(`<span class="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2">${u.firstName} ${u.lastName}</span>`);
    rightItems.push(roleBadge(u.role));
    rightItems.push(dbBadge());
    rightItems.push(`<button id="logoutBtn" class="px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">Déconnexion</button>`);
  }
  
  navEl.innerHTML = `
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 mr-4">
              <img src="assets/img/logo-laplateforme.png" alt="La Plateforme_" class="h-6 sm:h-8" />
            </div>
            ${leftItems.join("")}
          </div>
          <div class="flex items-center gap-2">
            ${rightItems.join("")}
            ${darkModeBtn}
          </div>
        </div>
      </div>
    </nav>
  `;
  
  const logoutBtn = navEl.querySelector("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => { 
      logout(); 
      showToast("Déconnecté", "success"); 
      navigate("/login"); 
    });
  }
  
  const darkBtn = navEl.querySelector("#darkModeBtn");
  if (darkBtn) {
    darkBtn.addEventListener("click", toggleDarkMode);
  }
}

// Fonction pour gérer la route actuelle
function handleRoute() {
  if (!appEl || !navEl) return;
  renderNav();
  const hash = location.hash || "#/";
  const path = hash.replace(/^#/, "");
  const entry = routes[path];
  if (!entry) return;
  const { component, options } = entry;
  if (options.auth && !requireAuth()) return navigate("/login");
  if (options.roles && !requireRole(options.roles)) return navigate("/");
  appEl.innerHTML = component.render();
  if (component.mount) component.mount();
}

// Fonction pour démarrer le routeur
export function startRouter() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}