<?php
declare(strict_types=1);
require __DIR__ . '/../../config/db.php';
$contacts = [];
$subscriptions = [];
$issues = [];
try {
  $contacts = $pdo->query('SELECT id,name,email,message,created_at FROM contacts ORDER BY id DESC')->fetchAll();
  $subscriptions = $pdo->query('SELECT id,email,created_at FROM subscriptions ORDER BY id DESC')->fetchAll();
  $issues = $pdo->query('SELECT id,title,email,description,created_at FROM issues ORDER BY id DESC')->fetchAll();
} catch (Throwable $e) {}
?>
<section class="pt-10 pb-8">
  <h1 class="text-3xl font-bold tracking-tight">Administration</h1>
  <p class="mt-2 text-gray-600 dark:text-gray-400">Consultez les entrées enregistrées et supprimez-les si nécessaire.</p>
  <div class="mt-8 space-y-10">
    <div>
      <h2 class="text-lg font-semibold">Contacts</h2>
      <div class="mt-3 overflow-x-auto rounded border border-gray-200 dark:border-gray-800">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-3 py-2 text-left">Nom</th>
              <th class="px-3 py-2 text-left">Email</th>
              <th class="px-3 py-2 text-left">Message</th>
              <th class="px-3 py-2 text-left">Date</th>
              <th class="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($contacts as $c): ?>
            <tr class="border-t border-gray-200 dark:border-gray-800">
              <td class="px-3 py-2"><?= htmlspecialchars($c['name']) ?></td>
              <td class="px-3 py-2"><?= htmlspecialchars($c['email']) ?></td>
              <td class="px-3 py-2"><?= nl2br(htmlspecialchars($c['message'])) ?></td>
              <td class="px-3 py-2"><?= htmlspecialchars($c['created_at']) ?></td>
              <td class="px-3 py-2">
                <form action="actions/delete_entry.php" method="post">
                  <input type="hidden" name="type" value="contacts" />
                  <input type="hidden" name="id" value="<?= (int)$c['id'] ?>" />
                  <button class="rounded bg-red-600 px-3 py-1 text-white">Supprimer</button>
                </form>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold">Newsletter</h2>
      <div class="mt-3 overflow-x-auto rounded border border-gray-200 dark:border-gray-800">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-3 py-2 text-left">Email</th>
              <th class="px-3 py-2 text-left">Date</th>
              <th class="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($subscriptions as $s): ?>
            <tr class="border-t border-gray-200 dark:border-gray-800">
              <td class="px-3 py-2"><?= htmlspecialchars($s['email']) ?></td>
              <td class="px-3 py-2"><?= htmlspecialchars($s['created_at']) ?></td>
              <td class="px-3 py-2">
                <form action="actions/delete_entry.php" method="post">
                  <input type="hidden" name="type" value="subscriptions" />
                  <input type="hidden" name="id" value="<?= (int)$s['id'] ?>" />
                  <button class="rounded bg-red-600 px-3 py-1 text-white">Supprimer</button>
                </form>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold">Problèmes</h2>
      <div class="mt-3 overflow-x-auto rounded border border-gray-200 dark:border-gray-800">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-3 py-2 text-left">Titre</th>
              <th class="px-3 py-2 text-left">Email</th>
              <th class="px-3 py-2 text-left">Description</th>
              <th class="px-3 py-2 text-left">Date</th>
              <th class="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($issues as $i): ?>
            <tr class="border-t border-gray-200 dark:border-gray-800">
              <td class="px-3 py-2"><?= htmlspecialchars($i['title']) ?></td>
              <td class="px-3 py-2"><?= htmlspecialchars((string)$i['email']) ?></td>
              <td class="px-3 py-2"><?= nl2br(htmlspecialchars($i['description'])) ?></td>
              <td class="px-3 py-2"><?= htmlspecialchars($i['created_at']) ?></td>
              <td class="px-3 py-2">
                <form action="actions/delete_entry.php" method="post">
                  <input type="hidden" name="type" value="issues" />
                  <input type="hidden" name="id" value="<?= (int)$i['id'] ?>" />
                  <button class="rounded bg-red-600 px-3 py-1 text-white">Supprimer</button>
                </form>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
