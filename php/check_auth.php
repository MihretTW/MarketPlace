<?php
// php/check_auth.php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedin' => true,
        'user_id'  => $_SESSION['user_id'],
        'username' => $_SESSION['username'] ?? 'User'
    ]);
} else {
    echo json_encode([
        'loggedin' => false
    ]);
}
?>