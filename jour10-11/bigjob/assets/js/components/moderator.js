import { listRequests, updateRequestStatus, listUsers } from "../storage.js";
import { formatDateFR, escapeHTML } from "../utils.js";
import { showToast } from "../toast.js";

export const Moderator = {
  state: { status: "all", date: "" },
  render() {
    const reqs = listRequests();
    const users = listUsers();
    const filters = `
      <div class="flex items-center gap-2">
        <select id="modStatus" class="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
          <option value="all" ${this.state.status === "all" ? "selected" : ""}>Tous</option>
          <option value="pending" ${this.state.status === "pending" ? "selected" : ""}>En attente</option>
          <option value="approved" ${this.state.status === "approved" ? "selected" : ""}>Acceptées</option>
          <option value="rejected" ${this.state.status === "rejected" ? "selected" : ""}>Refusées</option>
        </select>
        <input id="modDate" type="date" value="${this.state.date}" class="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
        <button id="modReset" class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Réinitialiser</button>
      </div>`;
    const filtered = reqs.filter((r) => (this.state.status === "all" || r.status === this.state.status) && (!this.state.date || r.date === this.state.date));
    const rows = filtered
      .map((r) => {
        const u = users.find((x) => x.id === r.userId);
        const badge = r.status === "approved" ? "bg-green-100 text-green-700" : r.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
        const label = r.status === "approved" ? "Acceptée" : r.status === "rejected" ? "Refusée" : "En attente";
        const actions = `
          <div class="flex gap-2">
            <button data-action="approve" data-id="${r.id}" class="px-2 py-1 bg-green-600 text-white rounded text-xs">Accepter</button>
            <button data-action="reject" data-id="${r.id}" class="px-2 py-1 bg-red-600 text-white rounded text-xs">Refuser</button>
          </div>`;
        return `
          <tr class="border-b">
            <td class="p-2 text-sm">${u ? `${escapeHTML(u.firstName)} ${escapeHTML(u.lastName)}` : escapeHTML(r.userEmail || "")}</td>
            <td class="p-2 text-sm text-gray-600">${escapeHTML(u ? u.email : (r.userEmail || ""))}</td>
            <td class="p-2 text-sm">${formatDateFR(r.date)}</td>
            <td class="p-2 text-sm"><span class="px-2 py-1 rounded ${badge}">${label}</span></td>
            <td class="p-2">${actions}</td>
          </tr>`;
      })
      .join("");
    return `
      <section class="space-y-4">
        <h1 class="text-2xl font-semibold">Backoffice</h1>
        <div class="bg-white dark:bg-gray-800 shadow p-4 space-y-3 rounded">
          ${filters}
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="text-left border-b">
                  <th class="p-2 text-xs text-gray-500 dark:text-gray-400">Utilisateur</th>
                  <th class="p-2 text-xs text-gray-500 dark:text-gray-400">Email</th>
                  <th class="p-2 text-xs text-gray-500 dark:text-gray-400">Date</th>
                  <th class="p-2 text-xs text-gray-500 dark:text-gray-400">Statut</th>
                  <th class="p-2 text-xs text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody id="modTable">${rows}</tbody>
            </table>
          </div>
          <div id="modFeedback" class="text-sm"></div>
        </div>
      </section>`;
  },
  mount() {
    const table = document.getElementById("modTable");
    const fb = document.getElementById("modFeedback");
    const statusSel = document.getElementById("modStatus");
    const dateInp = document.getElementById("modDate");
    const resetBtn = document.getElementById("modReset");
    if (statusSel) statusSel.addEventListener("change", () => { this.state.status = statusSel.value; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    if (dateInp) dateInp.addEventListener("change", () => { this.state.date = dateInp.value; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    if (resetBtn) resetBtn.addEventListener("click", () => { this.state = { status: "all", date: "" }; const app = document.getElementById("app"); app.innerHTML = this.render(); this.mount(); });
    table.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const action = btn.getAttribute("data-action");
        updateRequestStatus(id, action === "approve" ? "approved" : "rejected");
        fb.className = action === "approve" ? "text-green-600" : "text-red-600";
        fb.textContent = action === "approve" ? "Demande acceptée" : "Demande refusée";
        showToast(fb.textContent, action === "approve" ? "success" : "error");
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount();
      });
    });
  }
};
