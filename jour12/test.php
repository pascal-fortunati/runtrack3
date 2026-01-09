<?php
// Configuration des projets
$projects = [
    'mvcstarter' => [
        'name' => 'MVC Starter',
        'description' => 'Projet MVC Starter kit',
        'path' => 'projets/mvc-starter'
    ],
    'moduleconnexion' => [
        'name' => 'Module Connexion',
        'description' => 'Projet module de connexion',
        'path' => 'projets/module-connexion'
    ],
    'memory' => [
        'name' => 'Jeu Mémoire',
        'description' => 'Projet jeu memory',
        'path' => 'projets/memory',
        'has_public' => false
    ],
    'strangerthings' => [
        'name' => 'Strangerthings',
        'description' => 'Projet strangerthings',
        'path' => 'projets/strangerthings',
        'has_public' => false
    ],
    'phone-pwa' => [
        'name' => 'Phone-pwa',
        'description' => 'Application Phone style Android avec alarmes, réveils et chronomètres.',
        'path' => 'projets/phone-pwa',
        'has_public' => false
    ],
];

// Récupère le chemin demandé
$requestUri = $_SERVER['REQUEST_URI'];

// Retire les paramètres GET de l'URL
$requestUri = strtok($requestUri, '?');

$scriptName = dirname($_SERVER['SCRIPT_NAME']);

// Retire le chemin de base si nécessaire
if ($scriptName !== '/') {
    $requestUri = substr($requestUri, strlen($scriptName));
}

// Gestion des alias de projet
// Permet par exemple de rediriger /hawkins -> /strangerthings
$projectAliases = [
    'hawkins' => 'strangerthings'
];

// Extrait le slug du projet
$requestUri = trim($requestUri, '/');
$parts = explode('/', $requestUri);
$projectSlug = $parts[0] ?? '';

// Vérifie si le slug est un alias
if (isset($projectAliases[$projectSlug])) {
    $realSlug = $projectAliases[$projectSlug];
    $subPath = '/' . implode('/', array_slice($parts, 1));

    // Redirection permanente vers le vrai slug
    header('Location: /' . $realSlug . $subPath, true, 301);
    exit;
}

// Si un projet est demandé
if (!empty($projectSlug) && isset($projects[$projectSlug])) {
    $project = $projects[$projectSlug];
    $projectPath = __DIR__ . '/' . $project['path'];

    // Détermine si le projet a un dossier public
    $hasPublic = $project['has_public'] ?? true;
    $publicPath = $hasPublic ? $projectPath . '/public' : $projectPath;

    // Vérifie que le dossier existe
    if (!is_dir($publicPath)) {
        http_response_code(404);
        die("Dossier introuvable pour ce projet: " . $publicPath);
    }

    // Reconstruit le sous-chemin après le slug du projet
    $subPath = '/' . implode('/', array_slice($parts, 1));
    if ($subPath === '/') {
        $subPath = '';
    }

    // Gestion WordPress pour le projet "mycms"
    if ($projectSlug === 'mycms') {

        // 1. Accès à /mycms/ → charger index.php
        if ($subPath === '/' || $subPath === '') {
            $wpIndex = $publicPath . '/index.php';
            if (file_exists($wpIndex)) {
                $_SERVER['SCRIPT_FILENAME'] = $wpIndex;
                $_SERVER['SCRIPT_NAME'] = '/' . $projectSlug . '/index.php';
                $_SERVER['REQUEST_URI'] = '/' . $projectSlug . '/';
                chdir($publicPath);
                require $wpIndex;
                exit;
            }
        }

        // 2. Accès aux paths /wp-admin, /wp-content, /wp-includes, etc.
        if (preg_match('#^/wp-#', $subPath)) {
            $wpFilePath = $publicPath . $subPath;

            // Fichiers PHP
            if (substr($subPath, -4) === '.php' && file_exists($wpFilePath)) {
                $_SERVER['SCRIPT_FILENAME'] = $wpFilePath;
                $_SERVER['SCRIPT_NAME'] = '/' . $projectSlug . $subPath;
                $_SERVER['REQUEST_URI'] = '/' . $projectSlug . $subPath;
                chdir($publicPath);
                require $wpFilePath;
                exit;
            }

            // Dossier contenant un index.php
            if (is_dir($wpFilePath) && file_exists($wpFilePath . '/index.php')) {
                $_SERVER['SCRIPT_FILENAME'] = $wpFilePath . '/index.php';
                $_SERVER['SCRIPT_NAME'] = '/' . $projectSlug . $subPath . '/index.php';
                $_SERVER['REQUEST_URI'] = '/' . $projectSlug . $subPath . '/';
                chdir($publicPath);
                require $wpFilePath . '/index.php';
                exit;
            }
        }
    }
    // ===== FIN GESTION WORDPRESS =====

    // Gestion des fichiers .html implicites
    if (!empty($subPath) && $subPath !== '/' && !pathinfo($subPath, PATHINFO_EXTENSION)) {
        $testHtmlPath = $publicPath . $subPath . '.html';
        if (file_exists($testHtmlPath) && is_file($testHtmlPath)) {
            header('Content-Type: text/html; charset=UTF-8');
            readfile($testHtmlPath);
            exit;
        }
    }

    // Gestion des fichiers statiques
    if (!empty($subPath) && $subPath !== '/') {
        // Récupère l'extension du fichier demandé
        $ext = strtolower(pathinfo($subPath, PATHINFO_EXTENSION));
        $staticExtensions = ['html', 'css', 'js', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot', 'webp'];

        // Si c'est une extension de fichier statique
        if (in_array($ext, $staticExtensions)) {
            // Construit le chemin absolu du fichier
            $filePath = $publicPath . $subPath;

            // Vérifie si le fichier existe
            if (file_exists($filePath) && is_file($filePath)) {
                // Détermine le type MIME
                $mimeTypes = [
                    'html' => 'text/html',
                    'css' => 'text/css',
                    'js' => 'text/javascript',
                    'json' => 'application/json',
                    'png' => 'image/png',
                    'jpg' => 'image/jpeg',
                    'jpeg' => 'image/jpeg',
                    'gif' => 'image/gif',
                    'svg' => 'image/svg+xml',
                    'ico' => 'image/x-icon',
                    'woff' => 'font/woff',
                    'woff2' => 'font/woff2',
                    'ttf' => 'font/ttf',
                    'eot' => 'application/vnd.ms-fontobject',
                    'webp' => 'image/webp'
                ];

                if (isset($mimeTypes[$ext])) {
                    header('Content-Type: ' . $mimeTypes[$ext]);
                    readfile($filePath);
                    exit;
                }
            } else {
                // Fichier statique non trouvé
                http_response_code(404);
                header('Content-Type: text/plain');
                die("Static file not found: " . $subPath);
            }
        }
    }

    chdir($publicPath);

    define('BASE_URL', '/' . $projectSlug);
    $_SERVER['SCRIPT_NAME'] = '/' . $projectSlug . '/index.php';
    $_SERVER['REQUEST_URI'] = $subPath;
    $_SERVER['PHP_SELF'] = '/' . $projectSlug . '/index.php';

    if (!empty($subPath) && $subPath !== '/') {
        $_GET['url'] = trim($subPath, '/');
    } else {
        $_GET['url'] = '';
    }

    $indexPhp = $publicPath . '/index.php';
    $indexHtml = $publicPath . '/index.html';

    if (file_exists($indexPhp)) {
        require $indexPhp;
        exit;
    }

    if (file_exists($indexHtml)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($indexHtml);
        exit;
    }

    http_response_code(404);
    die("Index introuvable dans le projet");
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pascal Fortunati | Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');

        body {
            font-family: 'JetBrains Mono', monospace;
        }

        .glow {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3);
        }

        .border-glow {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        }

        .border-glow:hover {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3);
        }

        .grid-background {
            background-image:
                linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
        }

        @keyframes scan {
            0% {
                transform: translateY(-100%);
            }

            100% {
                transform: translateY(100vh);
            }
        }

        .scan-line {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.8), transparent);
            animation: scan 8s linear infinite;
            pointer-events: none;
        }
    </style>
</head>

<body class="bg-slate-950 min-h-screen text-amber-50 grid-background relative overflow-x-hidden">
    <div class="scan-line"></div>

    <div class="container mx-auto px-6 py-16 max-w-7xl relative z-10">
        <!-- Header -->
        <div class="mb-20 text-center">
            <div class="inline-block mb-6">
                <div class="text-amber-400 text-sm font-semibold tracking-widest mb-2 animate-pulse">
                    [ SYSTEM ONLINE ]
                </div>
                <h1 class="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 glow">
                    PASCAL FORTUNATI
                </h1>
                <div class="mt-4 text-amber-400/60 text-lg tracking-wider">
                    &lt;/&gt; Full Stack Developer
                </div>
            </div>

            <div class="mt-8 flex justify-center gap-4 text-xs text-amber-400/40 font-mono">
                <span>◆ IP: 127.0.0.1</span>
                <span>◆ STATUS: ACTIVE</span>
                <span>◆ PROJECTS: <?= count($projects) ?></span>
            </div>
        </div>

        <?php if (empty($projects)): ?>
            <!-- Empty State -->
            <div class="text-center py-20">
                <div class="inline-block border-2 border-amber-400/30 rounded-lg p-12 bg-slate-900/50 backdrop-blur">
                    <div class="text-amber-400 text-6xl mb-4">⚠</div>
                    <h2 class="text-2xl font-bold text-amber-400 mb-4">NO PROJECTS DETECTED</h2>
                    <p class="text-amber-400/60">Initialize projects array in index.php</p>
                </div>
            </div>
        <?php else: ?>
            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($projects as $slug => $project): ?>
                    <a href="/<?= $slug ?>" class="group block">
                        <div class="bg-slate-900/80 backdrop-blur border-2 border-amber-400/20 rounded-lg p-6 transition-all duration-300 hover:border-amber-400 hover:bg-slate-900 border-glow h-full">
                            <!-- Project Header -->
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-amber-400 text-2xl">▸</div>
                                <div class="text-xs text-amber-400/40 font-mono">
                                    ./<?= $slug ?>
                                </div>
                            </div>

                            <!-- Project Title -->
                            <h2 class="text-xl font-bold text-amber-400 mb-3 group-hover:text-amber-300 transition-colors">
                                <?= htmlspecialchars($project['name']) ?>
                            </h2>

                            <!-- Project Description -->
                            <p class="text-amber-400/60 text-sm leading-relaxed mb-6">
                                <?= htmlspecialchars($project['description']) ?>
                            </p>

                            <!-- Footer -->
                            <div class="flex items-center justify-between pt-4 border-t border-amber-400/10">
                                <span class="text-xs text-amber-400/40 font-mono">
                                    [ENTER]
                                </span>
                                <span class="text-amber-400 group-hover:translate-x-2 transition-transform duration-300">
                                    →
                                </span>
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <!-- Footer -->
        <div class="mt-20 text-center">
            <div class="inline-block border border-amber-400/20 rounded px-6 py-3 bg-slate-900/50 backdrop-blur">
                <p class="text-amber-400/60 text-sm font-mono">
                    <span class="text-amber-400">$</span> Built with passion at La Plateforme_
                    <span class="text-amber-400 animate-pulse">_</span>
                </p>
            </div>
        </div>
    </div>

    <!-- Corner Decorations -->
    <div class="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-400/20 pointer-events-none"></div>
    <div class="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-400/20 pointer-events-none"></div>
</body>

</html>