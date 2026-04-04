<?php
// php/signin.php - FIXED VERSION
session_start();
header('Content-Type: application/json');
$connect = new mysqli('localhost', 'root', '', 'marketplace');

if ($connect->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database error"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$stmt = $connect->prepare("SELECT id, username, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    echo json_encode(["status" => "success", "user" => $user['username']]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}

$stmt->close();
$connect->close();
?>