<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Job 02</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>

    <header class="bg-blue-600">
        <nav class="max-w-6xl mx-auto flex justify-end space-x-6 p-4 text-white">
            <a href="index.php">Accueil</a>
            <a href="index.php">Inscription</a>
            <a href="index.php">Connexion</a>
            <a href="index.php">Rechercher</a>
        </nav>
    </header>

    <section class="bg-slate-100 min-h-screen flex items-center justify-center">

        <form class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-5">

            <h2 class="text-2xl font-semibold text-center text-slate-700">
                Création de compte
            </h2>

            <!-- Civilité -->
            <div>
                <p class="text-slate-600 mb-2">Civilité</p>
                <div class="flex gap-6">
                    <label class="flex items-center gap-2">
                        <input type="radio" name="civilite" class="accent-blue-600">
                        Monsieur
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="radio" name="civilite" class="accent-blue-600">
                        Madame
                    </label>
                </div>
            </div>

            <!-- Prénom -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    👤
                </span>
                <input type="text"
                    placeholder="Prénom"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Nom -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    👤
                </span>
                <input type="text"
                    placeholder="Nom"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Adresse -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    🏠
                </span>
                <input type="text"
                    placeholder="Adresse"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Email -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    ✉️
                </span>
                <input type="email"
                    placeholder="Email"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Mot de passe -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    🔒
                </span>
                <input type="password"
                    placeholder="Mot de passe"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Confirmation -->
            <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    🔒
                </span>
                <input type="password"
                    placeholder="Confirmation du mot de passe"
                    class="w-full pl-10 p-3 rounded-lg border border-slate-300
                          focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Passions -->
            <div>
                <p class="text-slate-600 mb-2">Passions</p>
                <div class="grid grid-cols-2 gap-2">
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="accent-blue-600">
                        Informatique
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="accent-blue-600">
                        Voyages
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="accent-blue-600">
                        Sport
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="accent-blue-600">
                        Lecture
                    </label>
                </div>
            </div>

            <!-- Bouton -->
            <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold py-3 rounded-lg shadow-lg
                       transition duration-200">
                Valider
            </button>

        </form>
    </section>

    <footer class="bg-blue-600 text-white text-center p-4 mt-10">
        <a class="mx-2" href="index.php">Accueil</a>
        <a class="mx-2" href="index.php">Inscription</a>
        <a class="mx-2" href="index.php">Connexion</a>
        <a class="mx-2" href="index.php">Rechercher</a>
    </footer>

</body>

</html>