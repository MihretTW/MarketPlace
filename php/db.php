<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "marketplace";

$connect = new mysqli($servername, $username, $password, $dbname);

if ($connect->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Set charset to handle special characters
$connect->set_charset("utf8mb4");
?>