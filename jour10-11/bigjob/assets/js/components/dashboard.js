import { currentUser } from "../auth.js";
import { createRequest, listRequestsByUser, deleteRequest } from "../storage.js";
import { buildMonth, monthLabel, weekDays } from "../calendar.js";
import { isDatePast, formatDateFR } from "../utils.js";
import { showToast } from "../toast.js";

// Composant de dashboard pour afficher le calendrier et les demandes de présence
export const Dashboard = {
  state: { year: new Date().getFullYear(), month: new Date().getMonth() },
  render() {
    const u = currentUser();
    const y = this.state.year;
    const m = this.state.month;
    const days = buildMonth(y, m);
    const wd = weekDays();
    const reqs = u ? listRequestsByUser(u.id) : [];
    
    const legend = `
      <div class="flex items-center gap-3 text-sm">
        <span class="inline-flex items-center gap-1">
          <span class="w-3 h-3 rounded bg-yellow-400"></span> 
          <span class="text-gray-700 dark:text-gray-300">En attente</span>
        </span>
        <span class="inline-flex items-center gap-1">
          <span class="w-3 h-3 rounded bg-green-500"></span> 
          <span class="text-gray-700 dark:text-gray-300">Acceptée</span>
        </span>
        <span class="inline-flex items-center gap-1">
          <span class="w-3 h-3 rounded bg-red-500"></span> 
          <span class="text-gray-700 dark:text-gray-300">Refusée</span>
        </span>
      </div>`;
    
    const grid = `
      <div class="grid grid-cols-7 gap-2">
        ${wd.map((x) => `<div class="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">${x}</div>`).join("")}
        ${days
          .map((d) => {
            if (d.empty) return `<div class="h-16"></div>`;
            const status = reqs.find((r) => r.date === d.iso)?.status;
            const cls = status === "approved" 
              ? "ring-2 ring-green-500 dark:ring-green-400" 
              : status === "rejected" 
              ? "ring-2 ring-red-500 dark:ring-red-400" 
              : status === "pending" 
              ? "ring-2 ring-yellow-400 dark:ring-yellow-300" 
              : "ring-1 ring-gray-200 dark:ring-gray-600";
            const disabled = d.past 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer";
            return `<button data-iso="${d.iso}" class="h-16 rounded bg-white dark:bg-gray-700 ${cls} ${disabled} transition flex items-center justify-center">
              <span class="text-sm text-gray-900 dark:text-gray-100 font-medium">${Number(d.iso.slice(-2))}</span>
            </button>`;
          })
          .join("")}
      </div>`;
    
    const list = reqs.length > 0 ? `
      <div class="space-y-2">
        ${reqs
          .map((r) => {
            const badge = r.status === "approved" 
              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" 
              : r.status === "rejected" 
              ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" 
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300";
            const label = r.status === "approved" ? "Acceptée" : r.status === "rejected" ? "Refusée" : "En attente";
            const canCancel = !isDatePast(r.date) && (r.status === "pending" || r.status === "approved");
            const actions = canCancel 
              ? `<button data-del="${r.id}" class="px-3 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-700 transition">Annuler</button>`
              : "";
            return `<div class="flex items-center justify-between bg-white dark:bg-gray-700 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-600 p-3 rounded">
              <div class="text-sm text-gray-900 dark:text-gray-100">${formatDateFR(r.date)}</div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 text-xs rounded font-medium ${badge}">${label}</span>
                ${actions}
              </div>
            </div>`;
          })
          .join("")}
      </div>` 
    : `<div class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">Aucune demande pour le moment</div>`;
    
    return `
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Calendrier Présence</h1>
          <div class="flex items-center gap-2">
            <button id="prevMonth" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">Préc.</button>
            <div class="font-semibold text-gray-900 dark:text-white px-3">${monthLabel(y, m)}</div>
            <button id="nextMonth" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">Suiv.</button>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl p-6 space-y-4">
          ${legend}
          ${grid}
        </div>
        
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Mes demandes</h2>
          <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl p-6">
            ${list}
          </div>
        </div>
        
        <div id="dashFeedback" class="text-sm"></div>
      </section>`;
  },
  mount() {
    const u = currentUser();
    const fb = document.getElementById("dashFeedback");
    
    document.getElementById("prevMonth").addEventListener("click", () => {
      const m = this.state.month - 1;
      if (m < 0) {
        this.state.month = 11;
        this.state.year -= 1;
      } else this.state.month = m;
      const app = document.getElementById("app");
      app.innerHTML = this.render();
      this.mount();
    });
    
    document.getElementById("nextMonth").addEventListener("click", () => {
      const m = this.state.month + 1;
      if (m > 11) {
        this.state.month = 0;
        this.state.year += 1;
      } else this.state.month = m;
      const app = document.getElementById("app");
      app.innerHTML = this.render();
      this.mount();
    });
    
    document.querySelectorAll("button[data-iso]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const iso = btn.getAttribute("data-iso");
        if (isDatePast(iso)) {
          fb.className = "text-red-600 dark:text-red-400 font-medium";
          fb.textContent = "Date passée";
          showToast(fb.textContent, "error");
          return;
        }
        if (!u) return;
        const existing = listRequestsByUser(u.id).find((x) => x.date === iso);
        if (existing) {
          if (!isDatePast(iso) && (existing.status === "pending" || existing.status === "approved")) {
            const ok = confirm(`Annuler la demande pour ${formatDateFR(iso)} ?`);
            if (!ok) return;
            deleteRequest(existing.id);
            fb.className = "text-green-600 dark:text-green-400 font-medium";
            fb.textContent = `Demande annulée pour ${formatDateFR(iso)}`;
            showToast("Demande annulée", "success");
            const app = document.getElementById("app");
            app.innerHTML = this.render();
            this.mount();
            return;
          } else {
            fb.className = "text-yellow-700 dark:text-yellow-400 font-medium";
            const reason = isDatePast(iso) ? "date passée" : existing.status === "rejected" ? "demande refusée" : "non annulable";
            fb.textContent = `Demande déjà créée pour ${formatDateFR(iso)} (${existing.status}) — ${reason}`;
            showToast(`Non annulable: ${reason}`, "warning");
            return;
          }
        }
        createRequest({ userId: u.id, date: iso });
        fb.className = "text-green-600 dark:text-green-400 font-medium";
        fb.textContent = `Demande créée pour ${formatDateFR(iso)}`;
        showToast("Demande créée", "success");
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });

    document.querySelectorAll("button[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-del");
        const myReqs = listRequestsByUser(u.id);
        const req = myReqs.find((x) => x.id === id);
        if (!req) return;
        if (isDatePast(req.date) || req.status === "rejected") {
          const reason = isDatePast(req.date) ? "date passée" : "demande refusée";
          fb.className = "text-yellow-700 dark:text-yellow-400 font-medium";
          fb.textContent = `Annulation impossible (${reason})`;
          showToast(`Annulation impossible: ${reason}`, "warning");
          return;
        }
        if (!confirm(`Annuler la demande pour ${formatDateFR(req.date)} ?`)) return;
        deleteRequest(id);
        showToast("Demande annulée", "success");
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });
  }
};
