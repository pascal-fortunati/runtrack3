<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour02 - Job03</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            gap: 20px;
        }

        #button {
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        #button:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }

        #button:active {
            transform: translateY(0);
        }

        #compteur {
            font-size: 48px;
            font-weight: bold;
            color: #333;
            margin: 0;
        }
    </style>
</head>

<body>
    <p id="compteur">0</p>
    <button id="button">Cliquez-moi !</button>

    <script src="script.js"></script>
</body>

</html>