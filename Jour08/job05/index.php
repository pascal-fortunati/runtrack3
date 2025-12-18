<?php

declare(strict_types=1);
session_start();

$routes = [
    'docs' => 'pages/docs/home.php',
    'backend' => 'pages/docs/backend.php',
    'frontend' => 'pages/docs/frontend.php',
    'api' => 'pages/docs/api.php',
    'contact' => 'pages/forms/contact.php',
    'subscribe' => 'pages/forms/subscribe.php',
    'issue' => 'pages/forms/issue.php',
    'admin' => 'pages/forms/admin.php',
];

$page = isset($_GET['page']) ? $_GET['page'] : 'docs';
$content = $routes[$page] ?? $routes['docs'];

require __DIR__ . '/templates/layout.php';
