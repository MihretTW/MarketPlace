<?php
header('Content-Type: application/json');
session_start();
if (isset($_SESSION['iser_id'])){
    echo json_encode(['loggedin'=>true]);
}else{
    echo jeson_encode(['loggedin'=>false]);
}
?>