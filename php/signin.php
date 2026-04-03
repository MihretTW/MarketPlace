<?php
session_start();

$connect=new mysqli('localhost', 'root','', 'marketplace');
$data=json_decode(file_get_contents('php://input'),true);
$email=$data['email'];
$password=$data['password'];

$result=$connect->query("SELECT * FROM users WHERE email='$email'");
$user=$result->fetch_assoc();
if ($user && password_verify($password,$user['password'])){
    $_SESSION['user_id']=$user['id'];
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(['status'=>"error", "message"=>"Invalid email or password"]);
}
?>