<?php
$servername = "localhost";
$username = "root";        // default XAMPP user
$password = "";            // default XAMPP password is empty
$dbname = "marketplace";

$connect = new mysqli($servername, $username, $password, $dbname);

if ($connect->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}
?>