<?php 

    session_start();
    require_once('connection-users.php');

    $userID = $_SESSION['id'];
    $status = $_POST['status'];
    $examStartData = $_POST['startData'];
    
    try{
        $sql = 'INSERT INTO egzaminy (userID, status, dataStart) VALUES (:userID, :status, :startData)';

        $request = $pdo->prepare($sql);
        $request->bindValue(':userID', $userID);
        $request->bindValue(':status', $status);
        $request->bindValue(':startData', $examStartData);
        $request->execute();
    }catch(PDOException $e){
        echo $e->getMessage();
    }