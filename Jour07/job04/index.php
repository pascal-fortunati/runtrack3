<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Job 04</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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

    <section class="container">
        <form action="#" method="post">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Création de compte</span>
                    <div class="row">
                        <div class="col s12">
                            <span class="grey-text text-darken-1">Civilité</span>
                            <p>
                                <label>
                                    <input class="with-gap" type="radio" name="civilite" value="monsieur" required>
                                    <span><i class="material-icons left">person</i>Monsieur</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input class="with-gap" type="radio" name="civilite" value="madame" required>
                                    <span><i class="material-icons left">woman</i>Madame</span>
                                </label>
                            </p>
                        </div>

                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="prenom" name="prenom" type="text" class="validate" required>
                            <label for="prenom">Prénom</label>
                        </div>

                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">badge</i>
                            <input id="nom" name="nom" type="text" class="validate" required>
                            <label for="nom">Nom</label>
                        </div>

                        <div class="input-field col s12">
                            <i class="material-icons prefix">home</i>
                            <input id="adresse" name="adresse" type="text" class="validate" required>
                            <label for="adresse">Adresse</label>
                        </div>

                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input id="email" name="email" type="email" class="validate" required>
                            <label for="email">Email</label>
                        </div>

                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">lock</i>
                            <input id="password" name="password" type="password" class="validate" required>
                            <label for="password">Mot de passe</label>
                        </div>

                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="confirm" name="password_confirm" type="password" class="validate" required>
                            <label for="confirm">Confirmation</label>
                        </div>

                        <div class="col s12">
                            <span class="grey-text text-darken-1">Passions</span>
                            <p>
                                <label>
                                    <input type="checkbox" name="passions[]" value="informatique">
                                    <span><i class="material-icons left">computer</i>Informatique</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="passions[]" value="voyages">
                                    <span><i class="material-icons left">flight</i>Voyages</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="passions[]" value="sport">
                                    <span><i class="material-icons left">directions_run</i>Sport</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="passions[]" value="lecture">
                                    <span><i class="material-icons left">menu_book</i>Lecture</span>
                                </label>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card-action right-align">
                    <button class="btn waves-effect waves-light" type="submit">
                        Valider
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
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