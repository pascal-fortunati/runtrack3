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
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">La Plateforme_</div>
        <h1>Code Konami activé !</h1>
        <p>↑ ↑ ↓ ↓ ← → ← → B A</p>
    </div>

    <script src="script.js"></script>
</body>

</html>