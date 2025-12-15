<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 02</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">LPTF</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="https://laplateforme.io" target="_blank">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Units</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Jobs</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Skills</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="hero-section">
        <div class="container">
            <h1 class="hero-title">LaPlateforme_</h1>
            <div class="row">
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="card-papillon">
                        <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop" alt="Papillon">
                        <h5>Un Papillon</h5>
                        <p>Un papillon, c'est un peu comme une chenille, mais avec des ailes. Ne pas ingérer.</p>
                        <button class="btn-commander" id="btnPapillon">Commander votre propre papillon</button>
                    </div>
                </div>

                <div class="col-lg-6 col-md-8 mb-4">
                    <div class="content-card">
                        <h2 id="jumbotronTitle">Bonjour, monde!</h2>
                        <div id="jumbotronContent">
                            <p>Il existe plusieurs visions du terme :</p>
                            <p>le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                            <p>Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                            <p>Le sens étendu désigne l'univers dans son ensemble.</p>
                        </div>
                        <button class="btn-rebooter" id="btnReboot">Rebooter le Monde</button>
                        <span class="spinner-icon" id="spinner">↻</span>

                        <nav aria-label="Page navigation" class="d-flex justify-content-end">
                            <ul class="pagination pagination-sm">
                                <li class="page-item"><a class="page-link" data-page="prev">«</a></li>
                                <li class="page-item active"><a class="page-link" data-page="1">1</a></li>
                                <li class="page-item"><a class="page-link" data-page="2">2</a></li>
                                <li class="page-item"><a class="page-link" data-page="3">3</a></li>
                                <li class="page-item"><a class="page-link" data-page="next">»</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div class="col-lg-3 col-md-12 mb-4">
                    <div class="sidebar">
                        <div class="sidebar-header">Limbes</div>
                        <div class="sidebar-item active">Luxure</div>
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

    <section class="container">
        <div class="progress-section">
            <h5 class="progress-title">Installation de AI 9000</h5>
            <div class="progress-controls">
                <button class="progress-btn" id="btnProgressMinus">«</button>
                <div class="progress flex-grow-1">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" role="progressbar" style="width: 60%"></div>
                </div>
                <button class="progress-btn" id="btnProgressPlus">»</button>
            </div>
        </div>
    </section>

    <section class="container mb-5">
        <div class="row">
            <div class="col-md-6">
                <div class="form-section">
                    <h5>Recevez votre copie gratuite d'Internet 2!</h5>
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text">@</span>
                            <input type="text" class="form-control" placeholder="Login" id="loginField">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-8">
                                <input type="password" class="form-control" placeholder="Mot de Passe" id="passwordField">
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" value="@example.com" readonly id="domainField">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL des Internets 2 et 2.1 Beta</label>
                        <div class="row">
                            <div class="col-8">
                                <input type="text" class="form-control" value="DogeCoin" id="cryptoField">
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" value=".00" id="valueField">
                            </div>
                        </div>
                        <input type="text" class="form-control mt-2" value="https://i33t.lptf/dkvb/berlusconimkt/" id="urlField">
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-section">
                    <form id="rightForm">
                        <h5>Email address</h5>
                        <input type="email" class="form-control mb-2" placeholder="Email" id="emailField" required>
                        <small class="text-muted d-block mb-3">We'll never share your email with anyone else.</small>

                        <h5>Password</h5>
                        <input type="password" class="form-control mb-3" placeholder="Password" id="passwordFieldRight" required>

                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="checkmeout">
                            <label class="form-check-label" for="checkmeout">Check me out</label>
                        </div>

                        <button type="submit" class="btn-submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="papillonModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmation d'achat</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>Félicitations ! Votre papillon est en cours de préparation.</p>
                    <p>Il sera livré dès qu'il aura terminé sa métamorphose.</p>
                    <p><strong>Rappel :</strong> Ne pas ingérer.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">J'ai compris</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="formModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Récapitulatif du formulaire</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="formRecapContent"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>

</html>