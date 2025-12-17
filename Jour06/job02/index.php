<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 02</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-warning">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">LPTF</a>
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

    <section class="bg-light py-5">
        <div class="container">
            <h1 class="display-3 fw-bold mb-5 text-center">LaPlateforme_</h1>
            <div class="row">
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="card shadow-sm">
                        <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop" class="card-img-top" alt="Papillon">
                        <div class="card-body">
                            <h5 class="card-title">Un Papillon</h5>
                            <p class="card-text">Un papillon, c'est un peu comme une chenille, mais avec des ailes. Ne pas ingérer.</p>
                            <button class="btn btn-warning w-100" id="btnPapillon" data-bs-toggle="modal" data-bs-target="#papillonModal">Commander votre propre papillon</button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-8 mb-4">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title h3" id="jumbotronTitle">Bonjour, monde!</h2>
                            <div id="jumbotronContent">
                                <p class="card-text">Il existe plusieurs visions du terme :</p>
                                <p class="card-text">le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                                <p class="card-text">Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                                <p class="card-text">Le sens étendu désigne l'univers dans son ensemble.</p>
                            </div>
                            <button class="btn btn-danger mt-3" id="btnReboot">Rebooter le Monde</button>
                            <span class="spinner-border-custom d-none" id="spinner">↻</span>

                            <nav aria-label="Page navigation" class="d-flex justify-content-end mt-3">
                                <ul class="pagination pagination-sm">
                                    <li class="page-item"><a class="page-link" href="#" data-page="prev">«</a></li>
                                    <li class="page-item active"><a class="page-link" href="#" data-page="1">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#" data-page="3">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#" data-page="next">»</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-12 mb-4">
                    <div class="list-group shadow-sm">
                        <button type="button" class="list-group-item list-group-item-action active">Limbes</button>
                        <button type="button" class="list-group-item list-group-item-action">Luxure</button>
                        <button type="button" class="list-group-item list-group-item-action">Gourmandise</button>
                        <button type="button" class="list-group-item list-group-item-action">Avarice</button>
                        <button type="button" class="list-group-item list-group-item-action">Colere</button>
                        <button type="button" class="list-group-item list-group-item-action">Heresie</button>
                        <button type="button" class="list-group-item list-group-item-action">Violence</button>
                        <button type="button" class="list-group-item list-group-item-action">Ruse et Tromperie</button>
                        <button type="button" class="list-group-item list-group-item-action">Trahison</button>
                        <button type="button" class="list-group-item list-group-item-action">Internet Explorer</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="container my-5">
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Installation de AI 9000</h5>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-outline-secondary btn-sm" id="btnProgressMinus">«</button>
                    <div class="progress flex-grow-1" style="height: 25px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="progressBar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button class="btn btn-outline-secondary btn-sm" id="btnProgressPlus">»</button>
                </div>
            </div>
        </div>
    </section>

    <section class="container mb-5">
        <div class="row">
            <div class="col-md-6">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Recevez votre copie gratuite d'Internet 2!</h5>
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
            </div>

            <div class="col-md-6">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <form id="rightForm">
                            <h5 class="card-title">Email address</h5>
                            <input type="email" class="form-control mb-2" placeholder="Email" id="emailField" required>
                            <small class="form-text text-muted d-block mb-3">We'll never share your email with anyone else.</small>

                            <h5 class="card-title">Password</h5>
                            <input type="password" class="form-control mb-3" placeholder="Password" id="passwordFieldRight" required>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="checkmeout">
                                <label class="form-check-label" for="checkmeout">Check me out</label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
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