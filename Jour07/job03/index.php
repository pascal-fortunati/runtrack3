<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Job 03</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>

<body>
    <header>
        <nav class="teal">
            <div class="nav-wrapper container">
                <ul class="right">
                    <li><a href="index.php">Accueil</a></li>
                    <li><a href="inscription.php">Inscription</a></li>
                    <li><a href="connexion.php">Connexion</a></li>
                    <li><a href="rechercher.php">Rechercher</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <section>
        <h1>Création de compte</h1>
        <form action="#" method="post">
            <fieldset class="inline">
                <legend>Civilité</legend>
                <label><input type="radio" name="civilite" value="monsieur" required> Monsieur</label>
                <label><input type="radio" name="civilite" value="madame" required> Madame</label>
            </fieldset>

            <label for="prenom">Prénom</label>
            <input id="prenom" name="prenom" type="text" placeholder="Prénom" required>

            <label for="nom">Nom</label>
            <input id="nom" name="nom" type="text" placeholder="Nom" required>

            <label for="adresse">Adresse</label>
            <input id="adresse" name="adresse" type="text" placeholder="Adresse" required>

            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" required>

            <label for="password">Mot de passe</label>
            <input id="password" name="password" type="password" placeholder="Mot de passe" required>

            <label for="confirm">Confirmation</label>
            <input id="confirm" name="password_confirm" type="password" placeholder="Confirmation" required>

            <fieldset class="inline">
                <legend>Passions</legend>
                <label><input type="checkbox" name="passions[]" value="informatique"> Informatique</label>
                <label><input type="checkbox" name="passions[]" value="voyages"> Voyages</label>
                <label><input type="checkbox" name="passions[]" value="sport"> Sport</label>
                <label><input type="checkbox" name="passions[]" value="lecture"> Lecture</label>
            </fieldset>

            <button type="submit">Valider</button>
        </form>
    </section>

    <footer class="page-footer teal">
        <div class="container">
            <div class="row">
                <div class="col s12 center-align">
                    <ul>
                        <li><a class="white-text" href="index.php">Accueil</a></li>
                        <li><a class="white-text" href="inscription.php">Inscription</a></li>
                        <li><a class="white-text" href="connexion.php">Connexion</a></li>
                        <li><a class="white-text" href="rechercher.php">Rechercher</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</body>

</html>