<?php 
    session_start();
    include_once('connection-users.php');
    if(!isset($_SESSION['id'])){
        header('Location: index.php');
    }

    $sql2 = "SELECT * FROM egzaminy WHERE userID = :userID";
    $request2 = $pdo->prepare($sql2);
    $request2->bindParam(':userID',$_GET['userID']);
    $request2->execute();
    $response2 = $request2->fetchAll(PDO::FETCH_ASSOC);

    if($response2){
        header('Location: ./../progress.php');
    }
?>