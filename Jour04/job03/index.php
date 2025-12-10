<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Filtrer les Pokémon</title>
    <script defer src="script.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 2em;
        }

        form {
            margin-bottom: 1em;
        }

        label {
            margin-right: 0.5em;
        }

        input,
        select {
            margin-right: 1em;
        }

        #result {
            margin-top: 1em;
        }

        .pokemon {
            padding: 0.5em;
            border-bottom: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <h1>Filtrer les Pokémon</h1>
    <form id="filterForm" onsubmit="return false;">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom">
        <label for="type">Type :</label>
        <select id="type" name="type">
            <option value="">-- Tous --</option>
            <option value="Plante">Plante</option>
            <option value="Feu">Feu</option>
            <option value="Eau">Eau</option>
        </select>
        <input type="button" id="filtrer" value="Filtrer">
    </form>
    <div id="result"></div>
</body>

</html>