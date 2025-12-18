<?php

declare(strict_types=1);
$c = isset($content) ? $content : '';
?>
<div class="lg:sticky lg:top-24">
    <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Sur cette page</h2>
    <ul role="list" class="mt-3 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 text-sm dark:border-slate-800">
        <?php if (strpos($c, 'pages/docs/home.php') !== false): ?>
            <li class="relative">
                <a href="#getting-started" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Démarrage rapide</a>
            </li>
            <li class="relative">
                <a href="#install" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Installation des dépendances</a>
            </li>
            <li class="relative">
                <a href="#structure" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Structure du projet</a>
            </li>
        <?php elseif (strpos($c, 'pages/docs/backend.php') !== false): ?>
            <li class="relative">
                <a href="#init" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Initialisation</a>
            </li>
            <li class="relative">
                <a href="#mysql" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Connexion MySQL</a>
            </li>
            <li class="relative">
                <a href="#env" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Configuration .env</a>
            </li>
            <li class="relative">
                <a href="#routes" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Routes & contrôleurs</a>
            </li>
            <li class="relative">
                <a href="#services" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Services & sécurité</a>
            </li>
            <li class="relative">
                <a href="#middleware" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Middleware</a>
            </li>
            <li class="relative">
                <a href="#schema" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Schéma SQL</a>
            </li>
        <?php elseif (strpos($c, 'pages/docs/frontend.php') !== false): ?>
            <li class="relative">
                <a href="#axios" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Appels API avec Axios</a>
            </li>
            <li class="relative">
                <a href="#forms" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Formulaires React Hook Form</a>
            </li>
            <li class="relative">
                <a href="#perf" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Organisation & performance</a>
            </li>
            <li class="relative">
                <a href="#code-splitting" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Code splitting</a>
            </li>
            <li class="relative">
                <a href="#memoization" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Mémoïsation</a>
            </li>
            <li class="relative">
                <a href="#virtualization" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Virtualisation de listes</a>
            </li>
        <?php elseif (strpos($c, 'pages/docs/api.php') !== false): ?>
            <li class="relative">
                <a href="#conventions" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Conventions</a>
            </li>
            <li class="relative">
                <a href="#endpoints" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Endpoints</a>
            </li>
            <li class="relative">
                <a href="#erreurs" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Erreurs</a>
            </li>
            <li class="relative">
                <a href="#pagination" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Pagination & filtrage</a>
            </li>
            <li class="relative">
                <a href="#auth" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-[''] text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:hover:text-slate-300 dark:before:bg-slate-600">Auth (JWT)</a>
            </li>
        <?php else: ?>
            <li class="relative">
                <span class="block w-full pl-3.5 text-slate-400">Sélectionnez une page</span>
            </li>
        <?php endif; ?>
    </ul>
</div>