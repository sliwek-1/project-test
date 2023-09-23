<?php 

    $user = "root";
    $passwd = "";
    $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4");
    try{
        $pdo = new PDO('mysql:host=localhost;dbname=inf02;charset=utf8mb4', $user, $passwd, $options);

        if($pdo){
           // echo "success";
        }else{
           // echo "failed";
        }
    }catch(PDOException $e){
        //echo $e;
    }
?>