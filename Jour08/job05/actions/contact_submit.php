<?php

declare(strict_types=1);
require __DIR__ . '/../config/db.php';

$name = isset($_POST['name']) ? trim((string)$_POST['name']) : '';
$email = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
$message = isset($_POST['message']) ? trim((string)$_POST['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    header('Location: ?page=contact');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ?page=contact');
    exit;
}

$sql = 'INSERT INTO contacts(name,email,message,created_at) VALUES(?,?,?,NOW())';
$stmt = $pdo->prepare($sql);
$stmt->execute([
    strip_tags($name),
    strtolower($email),
    strip_tags($message),
]);

header('Location: ?page=contact&success=1');
exit;
