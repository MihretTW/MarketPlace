<?php
$connect = new mysqli('localhost', 'root', '', 'marketplace');

$data= json_decode(file_get_contents('php://input'),true);

#username=$data['username'];
$email=$data['email'];
$password=password_hash($data['password'], PASSWORD_DEFAULT);

$sql="INSTERT INTO users(username, email,password)
VALUES ('$username', '$email', '$password')";

$connect->query($sql);
?>