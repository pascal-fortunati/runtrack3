<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour02 - Job06</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            transition: all 0.5s ease;
        }

        body.konami {
            background: linear-gradient(135deg, #0065fc 0%, #0047AB 100%);
        }

        .container {
            text-align: center;
            opacity: 0;
            transform: scale(0);
            transition: all 0.5s ease;
        }

        body.konami .container {
            opacity: 1;
            transform: scale(1);
        }

        h1 {
            color: white;
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .logo {
            font-size: 72px;
            font-weight: bold;
            color: #0065fc;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
        }

        p {
            color: white;
            font-size: 20px;
            margin-top: 30px;
        }

        /* Conteneur des touches affichées */
        .keys-display {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 15px;
            padding: 20px 30px;
            z-index: 1000;
        }

        /* Style de chaque touche - Apparence réaliste de clavier */
        .key {
            min-width: 60px;
            height: 60px;
            background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
            color: #2c3e50;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 600;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border-radius: 6px;
            box-shadow:
                0 4px 0 #999,
                0 5px 2px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1);
            animation: keyPop 0.3s ease;
            padding: 0 12px;
            border: 1px solid #bbb;
            position: relative;
            transition: all 0.1s ease;
        }

        /* Effet d'enfoncement de touche */
        .key::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            height: 50%;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%);
            border-radius: 4px 4px 0 0;
            pointer-events: none;
        }

        /* Animation d'apparition de la touche */
        @keyframes keyPop {
            0% {
                transform: scale(0.8) translateY(0);
                opacity: 0;
            }

            50% {
                transform: scale(1.05) translateY(-2px);
            }

            100% {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
        }

        /* Style spécial pour les flèches */
        .key.arrow {
            font-size: 28px;
            color: #34495e;
        }

        /* Effet de validation quand le code est bon */
        .key.valid {
            background: linear-gradient(180deg, #2ecc71 0%, #27ae60 100%);
            color: white;
            box-shadow:
                0 4px 0 #1e8449,
                0 5px 2px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 0 20px rgba(46, 204, 113, 0.6);
            animation: keyPop 0.3s ease, pulseGlow 0.8s ease;
            border-color: #27ae60;
        }

        /* Effet d'erreur - touche rouge */
        .key.error {
            background: linear-gradient(180deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            box-shadow:
                0 4px 0 #922b21,
                0 5px 2px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            animation: keyPop 0.3s ease, shake 0.3s ease;
            border-color: #c0392b;
        }

        /* Animation de secousse pour les erreurs */
        @keyframes shake {

            0%,
            100% {
                transform: translateX(0) scale(1);
            }

            25% {
                transform: translateX(-5px) scale(1.05);
            }

            75% {
                transform: translateX(5px) scale(1.05);
            }
        }

        @keyframes pulseGlow {

            0%,
            100% {
                box-shadow:
                    0 4px 0 #1e8449,
                    0 5px 2px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 0 20px rgba(46, 204, 113, 0.6);
            }

            50% {
                box-shadow:
                    0 4px 0 #1e8449,
                    0 5px 2px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 0 30px rgba(46, 204, 113, 1),
                    0 0 40px rgba(46, 204, 113, 0.8);
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">La Plateforme_</div>
        <h1>Code Konami activé !</h1>
        <p>↑ ↑ ↓ ↓ ← → ← → B A</p>
    </div>

    <!-- Conteneur pour afficher les touches pressées -->
    <div class="keys-display" id="keys-display"></div>

    <script src="script.js"></script>
</body>

</html>