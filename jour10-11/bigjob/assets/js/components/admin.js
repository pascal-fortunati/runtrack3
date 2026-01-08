import { listUsers, updateUserRole, deleteUser, listRequests, updateRequestStatus } from "../storage.js";
import { formatDateFR, escapeHTML } from "../utils.js";
import { showToast } from "../toast.js";

// Composant d'administration pour gérer les utilisateurs, les rôles et les demandes de présence
export const Admin = {
  state: { status: "all", date: "", page: 1 },
  render() {
    const users = listUsers();
    const reqs = listRequests();
    const rows = users
      .map((u) => {
        return `
          <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td class="p-3 text-sm text-gray-900 dark:text-gray-100">${escapeHTML(u.firstName)} ${escapeHTML(u.lastName)}</td>
            <td class="p-3 text-sm text-gray-600 dark:text-gray-400">${escapeHTML(u.email)}</td>
            <td class="p-3">
              <select data-role="${u.id}" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <option value="user" ${u.role === "user" ? "selected" : ""}>Utilisateur</option>
                <option value="moderator" ${u.role === "moderator" ? "selected" : ""}>Modérateur</option>
                <option value="admin" ${u.role === "admin" ? "selected" : ""}>Administrateur</option>
              </select>
            </td>
            <td class="p-3">
              <button data-del="${u.id}" class="px-3 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-lg text-xs font-medium transition">Supprimer</button>
            </td>
          </tr>`;
      })
      .join("");
    
    const filters = `
      <div class="flex flex-wrap items-center gap-3">
        <select id="adminReqStatus" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          <option value="all" ${this.state.status === "all" ? "selected" : ""}>Tous les statuts</option>
          <option value="pending" ${this.state.status === "pending" ? "selected" : ""}>En attente</option>
          <option value="approved" ${this.state.status === "approved" ? "selected" : ""}>Acceptées</option>
          <option value="rejected" ${this.state.status === "rejected" ? "selected" : ""}>Refusées</option>
        </select>
        <input id="adminReqDate" type="date" value="${this.state.date}" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
        <button id="adminReqReset" class="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition">Réinitialiser</button>
      </div>`;
    
    const filtered = reqs.filter((r) => (this.state.status === "all" || r.status === this.state.status) && (!this.state.date || r.date === this.state.date));
    const pageSize = 10;
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(this.state.page || 1, 1), totalPages);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = filtered.slice(start, end);
    
    const reqRows = pageItems
      .map((r) => {
        const u = users.find((x) => x.id === r.userId);
        const badge = r.status === "approved" 
          ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" 
          : r.status === "rejected" 
          ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" 
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300";
        const label = r.status === "approved" ? "Acceptée" : r.status === "rejected" ? "Refusée" : "En attente";
        const actions = `
          <div class="flex gap-2">
            <button data-action="approve" data-id="${r.id}" class="px-3 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg text-xs font-medium transition">Accepter</button>
            <button data-action="reject" data-id="${r.id}" class="px-3 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-lg text-xs font-medium transition">Refuser</button>
          </div>`;
        return `
          <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td class="p-3 text-sm text-gray-900 dark:text-gray-100">${u ? `${escapeHTML(u.firstName)} ${escapeHTML(u.lastName)}` : escapeHTML(r.userEmail || "")}</td>
            <td class="p-3 text-sm text-gray-600 dark:text-gray-400">${escapeHTML(u ? u.email : (r.userEmail || ""))}</td>
            <td class="p-3 text-sm text-gray-900 dark:text-gray-100">${formatDateFR(r.date)}</td>
            <td class="p-3 text-sm"><span class="px-3 py-1 rounded-full font-medium ${badge}">${label}</span></td>
            <td class="p-3">${actions}</td>
          </tr>`;
      })
      .join("");

    const pages = Array.from({ length: totalPages }, (_, i) => {
      const n = i + 1;
      const active = n === page;
      const base = "px-3 py-1 rounded-lg text-xs font-medium transition";
      const cls = active
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200";
      return `<button data-page="${n}" class="${base} ${cls}">${n}</button>`;
    }).join(" ");
    const pagination = `
      <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400">Page ${page} sur ${totalPages} • ${total} demande${total > 1 ? "s" : ""}</div>
        <div class="flex items-center gap-2">
          <button id="adminReqPrev" ${page <= 1 ? "disabled" : ""} class="px-3 py-2 rounded-lg text-xs font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}">Précédent</button>
          <div class="flex items-center gap-1">${pages}</div>
          <button id="adminReqNext" ${page >= totalPages ? "disabled" : ""} class="px-3 py-2 rounded-lg text-xs font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 ${page >= totalPages ? "opacity-50 cursor-not-allowed" : ""}">Suivant</button>
        </div>
      </div>`;
    
    return `
      <section class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Administration</h1>
        
        <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Gestion des utilisateurs</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50 dark:bg-gray-700/50">
                <tr class="text-left">
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nom</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Rôle</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody id="adminTable">${rows}</tbody>
            </table>
          </div>
          <div id="adminFeedback" class="p-4 text-sm font-medium"></div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Demandes de présence</h2>
            ${filters}
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50 dark:bg-gray-700/50">
                <tr class="text-left">
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Utilisateur</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Statut</th>
                  <th class="p-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody id="adminReqTable">${reqRows}</tbody>
            </table>
          </div>
          ${pagination}
          <div id="adminReqFeedback" class="p-4 text-sm font-medium"></div>
        </div>
      </section>`;
  },
  mount() {
    const fb = document.getElementById("adminFeedback");
    const table = document.getElementById("adminTable");
    table.querySelectorAll("select[data-role]").forEach((sel) => {
      sel.addEventListener("change", () => {
        const id = sel.getAttribute("data-role");
        const role = sel.value;
        updateUserRole(id, role);
        fb.className = "text-green-600 dark:text-green-400";
        fb.textContent = "Rôle mis à jour avec succès";
        showToast(fb.textContent, "success");
      });
    });
    table.querySelectorAll("button[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-del");
        if (!confirm("Confirmer la suppression de l'utilisateur ?")) return;
        deleteUser(id);
        fb.className = "text-red-600 dark:text-red-400";
        fb.textContent = "Utilisateur supprimé";
        showToast(fb.textContent, "warning");
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });
    const reqTable = document.getElementById("adminReqTable");
    const reqFb = document.getElementById("adminReqFeedback");
    const statusSel = document.getElementById("adminReqStatus");
    const dateInp = document.getElementById("adminReqDate");
    const resetBtn = document.getElementById("adminReqReset");
    if (statusSel) statusSel.addEventListener("change", () => { this.state.status = statusSel.value; this.state.page = 1; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    if (dateInp) dateInp.addEventListener("change", () => { this.state.date = dateInp.value; this.state.page = 1; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    if (resetBtn) resetBtn.addEventListener("click", () => { this.state = { status: "all", date: "", page: 1 }; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    reqTable.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const action = btn.getAttribute("data-action");
        updateRequestStatus(id, action === "approve" ? "approved" : "rejected");
        reqFb.className = action === "approve" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
        reqFb.textContent = action === "approve" ? "Demande acceptée" : "Demande refusée";
        showToast(reqFb.textContent, action === "approve" ? "success" : "error");
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });
    const prevBtn = document.getElementById("adminReqPrev");
    const nextBtn = document.getElementById("adminReqNext");
    const pageBtns = document.querySelectorAll("button[data-page]");
    if (prevBtn) prevBtn.addEventListener("click", () => { this.state.page = Math.max((this.state.page || 1) - 1, 1); const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const reqsAll = listRequests();
        const filtered = reqsAll.filter((r) => (this.state.status === "all" || r.status === this.state.status) && (!this.state.date || r.date === this.state.date));
        const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
        this.state.page = Math.min((this.state.page || 1) + 1, totalPages);
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    }
    pageBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const n = parseInt(btn.getAttribute("data-page"), 10);
        this.state.page = isNaN(n) ? 1 : n;
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });
  }
};
