<?php

declare(strict_types=1);
$title = 'Syntax';
?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= $title ?></title>
  <script>
    (function() {
      var t = localStorage.getItem('theme');
      if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#6366F1'
            }
          }
        }
      }
    }
  </script>
  <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css" rel="stylesheet">
  <link href="assets/css/custom.css" rel="stylesheet">
</head>

<body class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
  <?php require __DIR__ . '/partials/header.php'; ?>
  <?php $contentPath = __DIR__ . '/../' . $content; ?>
  <?php require __DIR__ . '/partials/hero.php'; ?>
  <div id="docsContainer" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-8">
      <aside id="sidebar" class="col-span-12 lg:col-span-3 hidden lg:block">
        <?php require __DIR__ . '/partials/sidebar.php'; ?>
      </aside>
      <main id="mainContent" class="col-span-12 lg:col-span-7">
        <?php if (is_file($contentPath)) {
          require $contentPath;
        } ?>
      </main>
      <aside id="onpageAside" class="col-span-12 lg:col-span-2 hidden lg:block">
        <?php require __DIR__ . '/partials/onpage.php'; ?>
      </aside>
    </div>
  </div>
  <div id="searchDialog" class="hidden fixed inset-0 z-[60]">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    <div class="relative mx-auto mt-24 max-w-2xl rounded-xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
      <div class="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5 flex-none fill-slate-400 dark:fill-slate-500">
          <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
        </svg>
        <input id="searchInput" type="text" class="w-full bg-transparent text-sm outline-none placeholder-slate-400 dark:text-slate-200" placeholder="Rechercher des rubriques..." autocomplete="off">
        <button id="searchClose" type="button" class="rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Échap</button>
      </div>
      <ul id="searchResults" class="max-h-[50vh] overflow-y-auto p-2 text-sm"></ul>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs/loader.min.js"></script>
  <script>
    window.monacoBase = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs'
    if (typeof require !== 'undefined') {
      require.config({
        paths: {
          vs: window.monacoBase
        }
      })
      require(['vs/editor/editor.main'], function() {
        window.monacoReady = true
        if (window.initMonacoEditors) window.initMonacoEditors()
      })
    }
  </script>
  <script src="assets/js/theme.js"></script>
</body>

</html>