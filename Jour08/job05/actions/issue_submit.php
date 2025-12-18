<?php
declare(strict_types=1);
require __DIR__ . '/../config/db.php';

$title = isset($_POST['title']) ? trim((string)$_POST['title']) : '';
$email = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
$description = isset($_POST['description']) ? trim((string)$_POST['description']) : '';

if ($title === '' || $description === '') {
  header('Location: ?page=issue');
  exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header('Location: ?page=issue');
  exit;
}

$sql = 'INSERT INTO issues(title,email,description,created_at) VALUES(?,?,?,NOW())';
$stmt = $pdo->prepare($sql);
$stmt->execute([
  strip_tags($title),
  $email !== '' ? strtolower($email) : null,
  strip_tags($description),
]);

header('Location: ?page=issue&success=1');
exit;
