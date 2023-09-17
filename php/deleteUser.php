<?php 
    include_once('connection-users.php');
    session_start();

    $userID = $_POST['userID'];

    $sql = "DELETE FROM users WHERE id = :id";
    $request = $pdo->prepare($sql);
    $request->bindParam(':id', $userID);

    $request->execute();

    if($request){
        echo "success";
    }
?>