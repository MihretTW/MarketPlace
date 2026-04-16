<?php
session_start();
header('Content-Type: application/json');

include 'db.php';

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1;

$title       = trim($_POST['title'] ?? '');
$price       = floatval($_POST['price'] ?? 0);
$description = trim($_POST['description'] ?? '');

$image = '';

// Handle image upload
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $target_dir = "../uploads/";

    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $file_ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $allowed = array('jpg', 'jpeg', 'png', 'gif');

    if (in_array($file_ext, $allowed) && $_FILES['image']['size'] < 5000000) {
        $new_filename = time() . '_' . rand(1000, 9999) . '.' . $file_ext;
        $target_file  = $target_dir . $new_filename;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $image = $new_filename;
        }
    }
}

if (empty($title) || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Title and price are required"]);
    exit;
}

$stmt = $connect->prepare("INSERT INTO items (user_id, name, price, description, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isdss", $user_id, $title, $price, $description, $image);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Item posted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$connect->close();
?>