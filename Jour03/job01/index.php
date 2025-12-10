<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour03 - Job01</title>
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

        #hideBtn {
            background: #dc3545;
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
    </style>
</head>

<body>
    <article id="citation" hidden>
        Les logiciels et les cathédrales, c'est un peu la même chose - d'abord on les construit, ensuite on prie.
    </article>

    <button id="button">Afficher la citation</button>
    <button id="hideBtn">Cacher la citation</button>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
</body>

</html>