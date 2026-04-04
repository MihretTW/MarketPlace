<?php
header('Content-Type: application/json');
$connect = new mysqli('localhost', 'root', '', 'marketplace');

if ($connect->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

$data= json_decode(file_get_contents('php://input'),true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Hash password & use prepared statement (prevents SQL injection)
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $connect->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Account created!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Email already exists or error occurred"]);
}

$stmt->close();
$connect->close();
?>