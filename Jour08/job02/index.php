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

    <section>
        <form>
            <p>Civilité</p>
            <input type="radio" name="civilite"> Monsieur
            <input type="radio" name="civilite"> Madame

            <br><br>

            <input type="text" placeholder="Prénom"><br>
            <input type="text" placeholder="Nom"><br>
            <input type="text" placeholder="Adresse"><br>
            <input type="email" placeholder="Email"><br>
            <input type="password" placeholder="Mot de passe"><br>
            <input type="password" placeholder="Confirmation"><br>

            <p>Passions</p>
            <input type="checkbox"> Informatique
            <input type="checkbox"> Voyages
            <input type="checkbox"> Sport
            <input type="checkbox"> Lecture

            <br><br>
            <button type="submit">Valider</button>
        </form>
    </section>

    <footer>
        <ul>
            <li><a href="index.php">Accueil</a></li>
            <li><a href="index.php">Inscription</a></li>
            <li><a href="index.php">Connexion</a></li>
            <li><a href="index.php">Rechercher</a></li>
        </ul>
    </footer>

</body>

</html>