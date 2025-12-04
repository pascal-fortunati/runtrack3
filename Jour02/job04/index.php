<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour02 - Job04</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            gap: 20px;
            padding: 20px;
        }

        #keylogger {
            width: 500px;
            height: 200px;
            padding: 15px;
            font-size: 16px;
            font-family: 'Courier New', monospace;
            border: 2px solid #007bff;
            border-radius: 8px;
            resize: vertical;
        }

        #keylogger:focus {
            outline: none;
            border-color: #0056b3;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
        }

        h2 {
            color: #333;
            margin: 0;
        }
    </style>
</head>

<body>
    <h2>Keylogger - Tapez des lettres</h2>
    <textarea id="keylogger" placeholder="Les lettres tapées apparaîtront ici..."></textarea>

    <script src="script.js"></script>
</body>

</html>