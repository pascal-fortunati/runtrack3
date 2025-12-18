<?php

declare(strict_types=1);
require __DIR__ . '/../config/db.php';

$type = isset($_POST['type']) ? $_POST['type'] : '';
$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

if (!in_array($type, ['contacts', 'subscriptions', 'issues'], true) || $id <= 0) {
    header('Location: ?page=admin');
    exit;
}

$sql = 'DELETE FROM ' . $type . ' WHERE id = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

header('Location: ?page=admin');
exit;
