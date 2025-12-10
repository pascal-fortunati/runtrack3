<?php
// Créer un nouveau dossier pour le jeu
$imgBaseDir = __DIR__ . '/assets/img/';
$jeuNum = 1;
while (is_dir($imgBaseDir . 'jeux' . $jeuNum)) {
    $jeuNum++;
}
$targetDir = $imgBaseDir . 'jeux' . $jeuNum . '/';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Gérer l'upload de l'image
if (isset($_FILES['imageUpload']) && $_FILES['imageUpload']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['imageUpload']['tmp_name'];
    $fileName = basename($_FILES['imageUpload']['name']);
    $fileType = mime_content_type($fileTmpPath);

    // Vérifier le type de l'image
    $typesPng = ['image/png', 'image/x-png'];
    $typesJpeg = ['image/jpeg', 'image/pjpeg', 'image/jpg'];
    $typesWebp = ['image/webp'];
    if (in_array($fileType, $typesPng) || in_array($fileType, $typesJpeg) || in_array($fileType, $typesWebp)) {
        // Charger l'image
        if (in_array($fileType, $typesPng)) {
            $img = imagecreatefrompng($fileTmpPath);
        } elseif (in_array($fileType, $typesJpeg)) {
            $img = imagecreatefromjpeg($fileTmpPath);
        } elseif (in_array($fileType, $typesWebp)) {
            if (function_exists('imagecreatefromwebp')) {
                $img = imagecreatefromwebp($fileTmpPath);
            } else {
                echo "Le support WebP n'est pas disponible sur ce serveur.";
                exit;
            }
        }
        $width = imagesx($img);
        $height = imagesy($img);

        // Découper l'image en 3x3 morceaux
        $rows = 3;
        $cols = 3;
        $pieceW = intval($width / $cols);
        $pieceH = intval($height / $rows);
        $pieces = [];
        $baseName = pathinfo($fileName, PATHINFO_FILENAME);
        for ($y = 0; $y < $rows; $y++) {
            for ($x = 0; $x < $cols; $x++) {
                $index = $y * $cols + $x;
                if ($index < 8) { // Ne pas créer le dernier morceau (espace vide)
                    $piece = imagecreatetruecolor($pieceW, $pieceH);
                    imagecopy($piece, $img, 0, 0, $x * $pieceW, $y * $pieceH, $pieceW, $pieceH);
                    $piecePath = $targetDir . ($index + 1) . '.png';
                    imagepng($piece, $piecePath);
                    $pieces[] = 'assets/img/jeux' . $jeuNum . '/' . ($index + 1) . '.png';
                }
            }
        }
        echo "Upload et découpe réussis !";
        // Enregistrer les informations du jeu dans jeux.json
        $jsonFile = __DIR__ . '/data/jeux.json';
        $jeux = [];
        if (file_exists($jsonFile)) {
            $jeux = json_decode(file_get_contents($jsonFile), true);
            if (!is_array($jeux)) $jeux = [];
        }
        $jeux['jeux' . $jeuNum] = $pieces;
        $jsonData = json_encode($jeux, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        if (file_put_contents($jsonFile, $jsonData) === false) {
            echo "Erreur lors de la création ou l'écriture du fichier jeux.json. Vérifiez les droits d'accès au dossier assets/img.";
        }
    } else {
        echo "Type d'image non supporté.";
    }
} else {
    echo "Erreur lors de l'upload.";
}
