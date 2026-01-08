import { connectJSONDir } from "../storage.js";
import { navigate } from "../router.js";
import { showToast } from "../toast.js";

// Composant de connexion à la base JSON pour enregistrer les données
export const ConnectDB = {
  render() {
    return `
      <section class="max-w-md mx-auto">
        <h1 class="text-2xl font-semibold mb-4 text-gray-200">Base JSON</h1>

        <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl p-6">
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Sélectionnez un dossiers.
          </p>

          <button id="connectDir" class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-4">
            Connecter le dossier
          </button>

          <div id="connectFeedback" class="text-sm mt-3 dark:text-gray-300"></div>
        </div>
      </section>
    `;
  },
  mount() {
    const btn = document.getElementById("connectDir");
    const fb = document.getElementById("connectFeedback");
    btn.addEventListener("click", async () => {
      const ok = await connectJSONDir();
      fb.className = ok ? "text-green-600" : "text-red-600";
      fb.textContent = ok ? "Dossier connecté" : "Échec de connexion";
      showToast(fb.textContent, ok ? "success" : "error");
      if (ok) navigate("/login");
    });
  }
};