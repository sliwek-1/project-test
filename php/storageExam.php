<?php 
    session_start();
    include_once('connection-users.php');

    $data = $_POST['date'];
    $wynik = $_POST['wynik'];
    $exam = $_POST['exam-id'];
    $userID = $_SESSION['id'];

    $sql = "INSERT INTO egzaminy(userID, egzamin_data, egzamin_typ, wynik) VALUES (:userID, :data, :typ, :wynik)";

    $request = $pdo->prepare($sql);

    $request->bindParam(':userID', $userID);
    $request->bindParam(':data', $data);
    $request->bindParam(':typ', $exam);
    $request->bindParam(':wynik', $wynik);

    $request->execute();
?>