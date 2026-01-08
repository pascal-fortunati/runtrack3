let TOAST_HOLDER = null;

// Fonction pour créer le conteneur de toast
function ensureHolder() {
  if (TOAST_HOLDER) return TOAST_HOLDER;
  TOAST_HOLDER = document.createElement("div");
  TOAST_HOLDER.className = "fixed top-4 right-4 z-50 space-y-2";
  document.body.appendChild(TOAST_HOLDER);
  return TOAST_HOLDER;
}

// Fonction pour afficher un toast
export function showToast(message, type = "info") {
  const holder = ensureHolder();
  const bg = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : type === "warning" ? "bg-yellow-600" : "bg-gray-800";
  const el = document.createElement("div");
  el.className = `${bg} text-white px-3 py-2 rounded shadow transition`;
  el.textContent = String(message || "");
  holder.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-4px)";
    setTimeout(() => holder.removeChild(el), 250);
  }, 2000);
}