<?php

declare(strict_types=1);
?>

<section id="getting-started" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div id="install" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800 bg-white dark:bg-slate-900">
      <h2 class="text-sm font-semibold">Installation des dépendances</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Initialisez le backend Express et le frontend React.</p>
      <pre data-lang="bash" data-height="240" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>mkdir my-app
cd my-app
npm init -y
npm install express mysql2 dotenv zod cors
npx create-react-app web --template typescript
cd web
npm install axios react-hook-form zod @hookform/resolvers
npm run start
      </code></pre>
    </div>
    <div id="structure" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800 bg-white dark:bg-slate-900">
      <h2 class="text-sm font-semibold">Structure propre</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Organisez vos dossiers selon routes, controllers et services côté backend, et composants côté frontend.</p>
      <pre data-lang="text" data-height="240" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>backend/
  src/
    routes/
    controllers/
    services/
    db/
    middleware/
    utils/
frontend/
  src/
    components/
    pages/
    hooks/
    api/
    lib/
      </code></pre>
    </div>
    <div id="scripts" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800 bg-white dark:bg-slate-900">
      <h2 class="text-sm font-semibold">Scripts de démarrage</h2>
      <pre data-lang="json" data-height="260" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>{
  "scripts": {
    "dev:api": "ts-node src/server.ts",
    "dev:web": "react-scripts start",
    "dev": "concurrently \"npm:dev:api\" \"npm:dev:web\"",
    "build": "react-scripts build"
  }
}
      </code></pre>
      <pre data-lang="bash" data-height="180" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>npm install -D ts-node typescript concurrently
      </code></pre>
    </div>
  </div>
  <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
    <div>
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Précédent</dt>
      <dd class="mt-1"><span class="text-base font-semibold text-slate-400">—</span></dd>
    </div>
    <div class="ml-auto text-right">
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Suivant</dt>
      <dd class="mt-1">
        <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="?page=backend#init">
          Backend Node.js avec Express
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current">
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
          </svg>
        </a>
      </dd>
    </div>
  </dl>
</section>