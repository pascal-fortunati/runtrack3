<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu du Taquin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="min-h-screen p-4 relative text-yellow-400" style="background-color: #0a192f;">
    <div id="flash-message"></div>
    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-2xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-6xl font-black text-yellow-400 mb-2 text-center">Jeu du Taquin</h1>
            <p class="text-yellow-500 text-lg text-center">Reconstituez l'image en déplaçant les tuiles</p>
        </div>

        <!-- Section d'upload -->
        <div class="glass-effect rounded-2xl p-6 mb-6 shadow-2xl">
            <form id="uploadForm" enctype="multipart/form-data" class="space-y-4">
                <div>
                    <label for="imageUpload" class="block text-sm font-semibold text-yellow-400 mb-3">Uploader une image</label>
                    <div class="flex gap-3">
                        <input type="file"
                            name="imageUpload"
                            id="imageUpload"
                            accept="image/*"
                            class="flex-1 text-sm text-yellow-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold">
                        <button type="submit"
                            class="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full">
                            Uploader
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Sélection du jeu -->
        <div class="glass-effect rounded-2xl p-6 mb-6 shadow-2xl">
            <label for="selectJeu" class="block text-sm font-semibold text-yellow-400 mb-3">Sélectionner un jeu</label>
            <select id="selectJeu"
                class="w-full bg-[#112240] text-yellow-400 border-2 border-yellow-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 cursor-pointer">
            </select>
        </div>

        <!-- Plateau de jeu -->
        <div class="glass-effect rounded-2xl p-8 shadow-2xl mb-6">
            <div id="taquin" class="grid grid-cols-3 gap-3 w-fit mx-auto">
                <!-- Les tuiles du taquin seront générées ici dynamiquement -->
            </div>
        </div>

        <!-- Message de victoire -->
        <div id="win" class="hidden text-center mb-6">
            <div class="glass-effect rounded-2xl p-6 shadow-2xl win-animation">
                <div class="text-5xl mb-3">🎉</div>
                <h2 class="text-3xl font-bold text-yellow-400 mb-2">Félicitations !</h2>
                <p class="text-yellow-400">Vous avez reconstitué l'image !</p>
            </div>
        </div>

        <!-- Bouton Recommencer -->
        <div class="text-center">
            <button id="restart"
                class="hidden bg-yellow-400 text-blue-900 font-bold py-4 px-12 rounded-full uppercase tracking-wider">
                Recommencer
            </button>
        </div>

    </div>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>