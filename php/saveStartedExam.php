<?php 

    session_start();
    require_once('connection-users.php');

    $userID = $_SESSION['id'];
    $status = $_POST['status'];
    $examStartData = $_POST['startData'];
    $examID = $_POST['examID'];
    try{
        $sql = 'INSERT INTO egzaminy (userID, status, dataStart, egzamin_typ) VALUES (:userID, :status, :startData, :type)';

        $request = $pdo->prepare($sql);
        $request->bindValue(':userID', $userID);
        $request->bindValue(':status', $status);
        $request->bindValue(':startData', $examStartData);
        $request->bindValue(':type', $examID);
        
        $request->execute();
    }catch(PDOException $e){
        echo $e->getMessage();
    }