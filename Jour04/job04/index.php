<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Utilisateurs</title>
    <style>
        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
        }

        th {
            background: #f0f0f0;
        }
    </style>
</head>

<body>
    <h1>Liste des utilisateurs</h1>
    <button id="updateBtn">Update</button>
    <table id="usersTable" style="display:none;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <!-- Les utilisateurs seront insérés ici -->
        </tbody>
    </table>
    <script src="script.js"></script>
</body>

</html>