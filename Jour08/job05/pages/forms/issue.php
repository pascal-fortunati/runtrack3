<?php
declare(strict_types=1);
$success = isset($_GET['success']);
?>
<section class="pt-10 pb-8">
  <h1 class="text-3xl font-bold tracking-tight">Signaler un problème</h1>
  <p class="mt-2 text-gray-600 dark:text-gray-400">Décrivez le problème rencontré. Les données seront stockées en base.</p>
  <?php if ($success): ?>
    <div class="mt-4 rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">Problème enregistré.</div>
  <?php endif; ?>
  <form action="actions/issue_submit.php" method="post" class="mt-6 space-y-4">
    <div>
      <label class="text-sm">Titre</label>
      <input name="title" required class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800" />
    </div>
    <div>
      <label class="text-sm">Email (optionnel)</label>
      <input type="email" name="email" class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800" />
    </div>
    <div>
      <label class="text-sm">Description</label>
      <textarea name="description" rows="6" required class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"></textarea>
    </div>
    <button type="submit" class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Envoyer</button>
  </form>
</section>
