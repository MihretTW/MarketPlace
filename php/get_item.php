<?php
// php/get_items.php
header('Content-Type: application/json');
$connect = new mysqli('localhost', 'root', '', 'marketplace');

if ($connect->connect_error) {
    echo json_encode([]);
    exit;
}

$category = $_GET['category'] ?? null;

if ($category) {
    $stmt = $connect->prepare("SELECT items.*, users.username FROM items JOIN users ON items.user_id = users.id WHERE category = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $category);
    $stmt->execute();
} else {
    $stmt = $connect->prepare("SELECT items.*, users.username FROM items JOIN users ON items.user_id = users.id ORDER BY created_at DESC");
    $stmt->execute();
}

$result = $stmt->get_result();
$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);
$stmt->close();
$connect->close();
?>