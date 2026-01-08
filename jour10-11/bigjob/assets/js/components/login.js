import { login } from "../auth.js";
import { navigate } from "../router.js";
import { showToast } from "../toast.js";

// Composant de connexion pour accéder au dashboard et aux backoffice
export const Login = {
  render() {
    return `
      <section class="max-w-md mx-auto">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Connexion</h1>
          <p class="text-gray-600 dark:text-gray-400">Accédez à votre espace personnel</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 rounded-xl p-6">
          <form id="loginForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition" 
                placeholder="prenom.nom@laplateforme.io" 
                required 
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
              <input 
                type="password" 
                name="password" 
                class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition" 
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <button class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              Se connecter
            </button>
            
            <div id="loginFeedback" class="text-red-600 dark:text-red-400 text-sm font-medium text-center"></div>
          </form>
          
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-center text-gray-600 dark:text-gray-400">
              Pas encore de compte ? 
              <a class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition" href="#/register">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </section>
    `;
  },
  mount() {
    const form = document.getElementById("loginForm");
    const feedback = document.getElementById("loginFeedback");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.textContent = "";
      const data = Object.fromEntries(new FormData(form));
      try {
        const user = await login({ email: data.email, password: data.password });
        showToast("Connecté avec succès", "success");
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "moderator") navigate("/moderator");
        else navigate("/dashboard");
      } catch (err) {
        feedback.textContent = err.message || "Erreur de connexion";
        showToast(feedback.textContent, "error");
      }
    });
  }
};