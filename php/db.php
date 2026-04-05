<?php
// Database connection settings (XAMPP default)
$host = 'localhost';
$dbname = 'marketplace';   // ← CHANGE THIS to your actual database name
$username = 'root';
$password = '';            // XAMPP default is empty password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";   // uncomment only for testing
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>