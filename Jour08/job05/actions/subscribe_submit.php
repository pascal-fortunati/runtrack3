<?php

declare(strict_types=1);
require __DIR__ . '/../config/db.php';

$email = isset($_POST['email']) ? trim((string)$_POST['email']) : '';

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ?page=subscribe');
    exit;
}

$sql = 'INSERT INTO subscriptions(email,created_at) VALUES(?,NOW())';
$stmt = $pdo->prepare($sql);
$stmt->execute([
    strtolower($email),
]);

header('Location: ?page=subscribe&success=1');
exit;
