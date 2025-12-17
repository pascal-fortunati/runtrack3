<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cafés du Monde - Les Meilleurs Cafés</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <nav class="navbar-fixed">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" class="brand-logo">
                    <i class="material-icons" style="color: #d4af37; vertical-align: middle;">local_cafe</i>
                    Cafés du Monde
                </a>
                <a href="#" data-target="mobile-nav" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="#featured"><i class="material-icons left">stars</i>Sélection</a></li>
                    <li><a href="#new"><i class="material-icons left">fiber_new</i>Nouveautés<span
                                class="badge">3</span></a></li>
                    <li><a href="#origins"><i class="material-icons left">public</i>Origines</a></li>
                    <li><a href="#about"><i class="material-icons left">info</i>À propos</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <ul class="sidenav" id="mobile-nav">
        <li><a href="#featured"><i class="material-icons">stars</i>Sélection</a></li>
        <li><a href="#new"><i class="material-icons">fiber_new</i>Nouveautés</a></li>
        <li><a href="#origins"><i class="material-icons">public</i>Origines</a></li>
        <li><a href="#about"><i class="material-icons">info</i>À propos</a></li>
    </ul>

    <div class="hero-section">
        <div class="hero-content">
            <h1 class="hero-title">Les Meilleurs Cafés du Monde</h1>
            <p class="hero-subtitle">Découvrez les origines d'exception et la culture du café moderne</p>
            <a href="#featured" class="btn-large btn-hero waves-effect waves-light">
                <i class="material-icons left">explore</i>Découvrir
            </a>
        </div>
    </div>

    <main class="container">
        <h2 class="section-title" id="featured">
            <i class="material-icons" style="vertical-align: middle; font-size: 3rem;">emoji_events</i>
            Notre Sélection
        </h2>

        <ul class="tabs tabs-fixed-width z-depth-1" style="border-radius: 50px; overflow: hidden;">
            <li class="tab"><a class="active" href="#tab-new">
                    <i class="material-icons left">fiber_new</i>Nouveaux
                </a></li>
            <li class="tab"><a href="#tab-top">
                    <i class="material-icons left">star</i>Top Cafés
                </a></li>
            <li class="tab"><a href="#tab-origins">
                    <i class="material-icons left">public</i>Origines
                </a></li>
        </ul>

        <div id="tab-new" class="row" style="margin-top: 40px;">
            <div class="col s12 m6 l4">
                <div class="card coffee-card">
                    <div class="card-image">
                        <span class="featured-badge">
                            <i class="material-icons tiny" style="vertical-align: middle;">stars</i> Coup de Cœur
                        </span>
                        <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                            alt="Café artisanal">
                    </div>
                    <div class="card-content">
                        <span class="chip"><i class="material-icons tiny left">location_on</i>Little Italy</span>
                        <span class="chip"><i class="material-icons tiny left">brush</i>Latte Art</span>
                        <h5 class="card-title">Café du Village</h5>
                        <div class="rating-stars">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_half</i>
                            <span style="color: rgba(255,255,255,0.6); margin-left: 10px;">4.5/5</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
                            Latte art emblématique, torréfaction locale, ambiance chaleureuse
                        </p>
                    </div>
                </div>
            </div>

            <div class="col s12 m6 l4">
                <div class="card coffee-card">
                    <div class="card-image">
                        <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                            alt="Expresso artisanal">
                    </div>
                    <div class="card-content">
                        <span class="chip"><i class="material-icons tiny left">location_on</i>Le Plateau</span>
                        <span class="chip"><i class="material-icons tiny left">local_cafe</i>Espresso</span>
                        <h5 class="card-title">Café M</h5>
                        <div class="rating-stars">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_half</i>
                            <i class="material-icons" style="color: rgba(255,255,255,0.3);">star_border</i>
                            <span style="color: rgba(255,255,255,0.6); margin-left: 10px;">3.5/5</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
                            Espresso intense, intérieur moderne, pâtisseries de saison
                        </p>
                    </div>
                </div>
            </div>

            <div class="col s12 m6 l4">
                <div class="card coffee-card">
                    <div class="card-image">
                        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
                            alt="Café moderne">
                    </div>
                    <div class="card-content">
                        <span class="chip"><i class="material-icons tiny left">science</i>Infusion</span>
                        <span class="chip"><i class="material-icons tiny left">auto_awesome</i>Premium</span>
                        <h5 class="card-title">Bar d'Infusion</h5>
                        <div class="rating-stars">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <span style="color: rgba(255,255,255,0.6); margin-left: 10px;">5.0/5</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
                            Méthodes d'infusion manuelles, origines uniques, expertise barista
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div id="tab-top" class="row" style="margin-top: 40px;">
            <div class="col s12 m6">
                <div class="card coffee-card">
                    <div class="card-image">
                        <span class="featured-badge">
                            <i class="material-icons tiny" style="vertical-align: middle;">emoji_events</i> #1
                        </span>
                        <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
                            alt="Top café">
                    </div>
                    <div class="card-content">
                        <span class="chip"><i class="material-icons tiny left">flag</i>France</span>
                        <span class="chip"><i class="material-icons tiny left">filter_alt</i>Filtre</span>
                        <h5 class="card-title">Vallaury</h5>
                        <div class="rating-stars">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <span style="color: rgba(255,255,255,0.6); margin-left: 10px;">5.0/5</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
                            Excellence française, méthodes traditionnelles revisitées
                        </p>
                    </div>
                </div>
            </div>

            <div class="col s12 m6">
                <div class="card coffee-card">
                    <div class="card-image">
                        <img src="https://images.unsplash.com/photo-1461988091159-2f64c2f12b39?auto=format&fit=crop&w=800&q=80"
                            alt="Café colombien">
                    </div>
                    <div class="card-content">
                        <span class="chip"><i class="material-icons tiny left">flag</i>Colombie</span>
                        <span class="chip"><i class="material-icons tiny left">workspace_premium</i>Primé</span>
                        <h5 class="card-title">Centre Sud</h5>
                        <div class="rating-stars">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons" style="color: rgba(255,255,255,0.3);">star_border</i>
                            <span style="color: rgba(255,255,255,0.6); margin-left: 10px;">4.0/5</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
                            Bar d'infusion colombien avec baristas primés internationalement
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div id="tab-origins">
            <h2 class="section-title" style="margin-top: 60px;">
                <i class="material-icons" style="vertical-align: middle; font-size: 3rem;">public</i>
                Origines d'Exception
            </h2>

            <div class="origin-grid">
                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80"
                        alt="Éthiopie">
                    <div class="origin-info">
                        <h4 class="origin-name">Éthiopie</h4>
                        <span class="origin-tag">Yirgacheffe</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=600&q=80"
                        alt="Kenya">
                    <div class="origin-info">
                        <h4 class="origin-name">Kenya</h4>
                        <span class="origin-tag">AA Nyeri</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80"
                        alt="Colombie">
                    <div class="origin-info">
                        <h4 class="origin-name">Colombie</h4>
                        <span class="origin-tag">Huila</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1485808191679-3a36f9d22295?auto=format&fit=crop&w=600&q=80"
                        alt="Brésil">
                    <div class="origin-info">
                        <h4 class="origin-name">Brésil</h4>
                        <span class="origin-tag">Sul de Minas</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
                        alt="Indonésie">
                    <div class="origin-info">
                        <h4 class="origin-name">Indonésie</h4>
                        <span class="origin-tag">Sumatra</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
                        alt="Guatemala">
                    <div class="origin-info">
                        <h4 class="origin-name">Guatemala</h4>
                        <span class="origin-tag">Antigua</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1514432324607-ce3ff065f7cf?auto=format&fit=crop&w=600&q=80"
                        alt="Costa Rica">
                    <div class="origin-info">
                        <h4 class="origin-name">Costa Rica</h4>
                        <span class="origin-tag">Tarrazú</span>
                    </div>
                </div>

                <div class="origin-card">
                    <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80"
                        alt="Rwanda">
                    <div class="origin-info">
                        <h4 class="origin-name">Rwanda</h4>
                        <span class="origin-tag">Gakenke</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col s12 m4">
                    <h5 class="footer-title">
                        <i class="material-icons" style="vertical-align: middle;">local_cafe</i>
                        Cafés du Monde
                    </h5>
                    <p style="color: rgba(255,255,255,0.7);">
                        Découvrez les meilleurs cafés du monde, leurs origines et la culture du café moderne.
                    </p>
                </div>
                <div class="col s12 m4">
                    <h5 class="footer-title">Navigation</h5>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="#featured" style="color: rgba(255,255,255,0.7); display: block; padding: 5px 0;">
                                <i class="material-icons tiny" style="vertical-align: middle;">stars</i> Sélection
                            </a></li>
                        <li><a href="#new" style="color: rgba(255,255,255,0.7); display: block; padding: 5px 0;">
                                <i class="material-icons tiny" style="vertical-align: middle;">fiber_new</i> Nouveautés
                            </a></li>
                        <li><a href="#origins" style="color: rgba(255,255,255,0.7); display: block; padding: 5px 0;">
                                <i class="material-icons tiny" style="vertical-align: middle;">public</i> Origines
                            </a></li>
                    </ul>
                </div>
                <div class="col s12 m4">
                    <h5 class="footer-title">Suivez-nous</h5>
                    <a href="#" class="btn waves-effect waves-light"
                        style="background: linear-gradient(135deg, #d4af37, #f4e4a6); color: #1a1a1a; margin: 5px;">
                        <i class="material-icons left">share</i>Partager
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-copyright" style="background: rgba(0,0,0,0.3); padding: 20px 0;">
            <div class="container center">
                © 2025 Cafés du Monde - Tous droits réservés
            </div>
        </div>
    </footer>

    <div class="fixed-action-btn">
        <a class="btn-floating btn-large">
            <i class="material-icons">local_cafe</i>
        </a>
        <ul>
            <li><a class="btn-floating tooltipped" data-position="left" data-tooltip="Carte">
                    <i class="material-icons">map</i>
                </a></li>
            <li><a class="btn-floating tooltipped" data-position="left" data-tooltip="Favoris">
                    <i class="material-icons">favorite</i>
                </a></li>
            <li><a class="btn-floating tooltipped" data-position="left" data-tooltip="Partager">
                    <i class="material-icons">share</i>
                </a></li>
        </ul>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="script.js"></script>
</body>

</html>