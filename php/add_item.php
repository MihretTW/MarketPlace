<?php

session_start();
header('Content-Type: application/json');

$connect = new mysqli('localhost', 'root', '', 'marketplace');
if ($connect->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
    }

if (!isset($_SESSION['user_id'])) {
    // For testing without session, we'll accept user_id from frontend
    // In real project: uncomment below to require login
    // echo json_encode(["status" => "error", "message" => "Please sign in first"]);
    // exit;
}

$data = json_decode(file_get_contents('php://input'), true);


$user_id = intval($data['user_id'] ?? 1); 
$name = trim($data['name'] ?? '');
$price = floatval($data['price'] ?? 0);
$description = trim($data['description'] ?? '');
$category = trim($data['category'] ?? 'general');
$image_url = trim($data['image_url'] ?? 'https://via.placeholder.com/300');

if (empty($name) || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Name and valid price are required"]);
    exit;
}

$stmt = $connect->prepare("INSERT INTO items (user_id, name, price, description, category, image_url) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isdsss", $user_id, $name, $price, $description, $category, $image_url);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success", 
        "message" => "Item posted successfully!",
        "item_id" => $connect->insert_id
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to post item: " . $stmt->error]);
}

$stmt->close();
$connect->close();

?>