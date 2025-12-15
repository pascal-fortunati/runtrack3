<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 01</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">LPTF</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="#">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Units</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Jobs</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Skills</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1 class="hero-title">LaPlateforme_</h1>

            <div class="row">
                <!-- Card Papillon -->
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="card-papillon">
                        <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop" alt="Papillon">
                        <h5>Un Papillon</h5>
                        <p>Un papillon, c'est un peu comme une chenille, mais avec des ailes. Ne pas ingérer.</p>
                        <button class="btn-commander">Commander votre propre papillon</button>
                    </div>
                </div>

                <!-- Content Card -->
                <div class="col-lg-6 col-md-8 mb-4">
                    <div class="content-card">
                        <h2>Bonjour, monde!</h2>
                        <p>Il existe plusieurs visions du terme :</p>
                        <p>le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                        <p>Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                        <p>Le sens étendu désigne l'univers dans son ensemble.</p>
                        <button class="btn-rebooter">Rebooter le Monde</button>
                        <span style="color: #00bcd4; font-size: 1.5rem; margin-left: 10px;">↻</span>

                        <nav aria-label="Page navigation" class="d-flex justify-content-end">
                            <ul class="pagination pagination-sm">
                                <li class="page-item"><a class="page-link" href="#">«</a></li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">»</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="col-lg-3 col-md-12 mb-4">
                    <div class="sidebar">
                        <div class="sidebar-header">Limbes</div>
                        <div class="sidebar-item">Luxure</div>
                        <div class="sidebar-item">Gourmandise</div>
                        <div class="sidebar-item">Avarice</div>
                        <div class="sidebar-item">Colere</div>
                        <div class="sidebar-item">Heresie</div>
                        <div class="sidebar-item">Violence</div>
                        <div class="sidebar-item">Ruse et Tromperie</div>
                        <div class="sidebar-item">Trahison</div>
                        <div class="sidebar-item">Internet Explorer</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Progress Section -->
    <section class="container">
        <div class="progress-section">
            <h5 class="progress-title">Installation de AI 9000</h5>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </section>

    <!-- Forms Section -->
    <section class="container mb-5">
        <div class="row">
            <!-- Left Form -->
            <div class="col-md-6">
                <div class="form-section">
                    <h5>Recevez votre copie gratuite d'Internet 2!</h5>
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text">@</span>
                            <input type="text" class="form-control" placeholder="Login">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-8">
                                <input type="password" class="form-control" placeholder="Mot de Passe">
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" value="@example.com" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL des Internets 2 et 2.1 Beta</label>
                        <div class="row">
                            <div class="col-8">
                                <input type="text" class="form-control" value="DogeCoin">
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" value=".00">
                            </div>
                        </div>
                        <input type="text" class="form-control mt-2" value="https://i33t.lptf/dkvb/berlusconimkt/">
                    </div>
                </div>
            </div>

            <!-- Right Form -->
            <div class="col-md-6">
                <div class="form-section">
                    <h5>Email address</h5>
                    <input type="email" class="form-control mb-2" placeholder="Email">
                    <small class="text-muted d-block mb-3">We'll never share your email with anyone else.</small>

                    <h5>Password</h5>
                    <input type="password" class="form-control mb-3" placeholder="Password">

                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="checkmeout">
                        <label class="form-check-label" for="checkmeout">Check me out</label>
                    </div>

                    <button class="btn-submit">Submit</button>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.min.js"></script>
</body>

</html>