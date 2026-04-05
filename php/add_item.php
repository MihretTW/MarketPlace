<?php
session_start();
header('Content-Type: application/json');

include 'db.php';

// For class project - allow posting without login (change later if needed)
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1;

$title       = trim($_POST['title'] ?? '');
$price       = floatval($_POST['price'] ?? 0);
$description = trim($_POST['description'] ?? '');

// Handle image upload
$image = '';

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $target_dir = "../uploads/";
    
    // Create uploads folder if it doesn't exist
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $file_name = basename($_FILES['image']['name']);
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array($file_ext, $allowed) && $_FILES['image']['size'] < 5000000) { // max 5MB
        $new_filename = time() . '_' . rand(1000, 9999) . '.' . $file_ext;
        $target_file = $target_dir . $new_filename;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $image = $new_filename;
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to save image"]);
            exit;
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid image. Only JPG, PNG, GIF allowed and max 5MB"]);
        exit;
    }
}

if (empty($title) || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Title and valid price are required"]);
    exit;
}

// Insert into database
$stmt = $connect->prepare("INSERT INTO items (user_id, name, price, description, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isdss", $user_id, $title, $price, $description, $image);

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