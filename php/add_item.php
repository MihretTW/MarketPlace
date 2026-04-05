<?php
// php/add_item.php
session_start();
include 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Please sign in first"]);
    exit;
}

$title       = trim($_POST['title'] ?? '');
$price       = floatval($_POST['price'] ?? 0);
$description = trim($_POST['description'] ?? '');

if (empty($title) || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Title and price are required"]);
    exit;
}

try {
    // Insert the item first
    $stmt = $pdo->prepare("INSERT INTO items (user_id, name, price, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$_SESSION['user_id'], $title, $price, $description]);
    $item_id = $pdo->lastInsertId();

    // Handle multiple image uploads
    if (isset($_FILES['image']) && !empty($_FILES['image']['name'][0])) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }

        $total_files = count($_FILES['image']['name']);

        for ($i = 0; $i < $total_files; $i++) {
            if ($_FILES['image']['error'][$i] === UPLOAD_ERR_OK) {
                $file_name = time() . '_' . $i . '_' . basename($_FILES['image']['name'][$i]);
                $target_file = $upload_dir . $file_name;
                $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

                $allowed = ['jpg', 'jpeg', 'png', 'gif'];
                if (in_array($file_type, $allowed)) {
                    if (move_uploaded_file($_FILES['image']['tmp_name'][$i], $target_file)) {
                        $is_primary = ($i === 0) ? 1 : 0;   // First image is primary

                        $stmt = $pdo->prepare("INSERT INTO item_images (item_id, image, is_primary) VALUES (?, ?, ?)");
                        $stmt->execute([$item_id, $file_name, $is_primary]);
                    }
                }
            }
        }
    }

    echo json_encode([
        "status"  => "success", 
        "message" => "Item posted successfully with images!"
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Failed to post item"]);
}
?>