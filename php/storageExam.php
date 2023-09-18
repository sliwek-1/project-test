<?php 
    session_start();
    include_once('connection-users.php');

    $data = $_POST['date-end'];
    $dataStart = $_POST['data-start'];
    $wynik = $_POST['wynik'];
    $exam = $_POST['exam-id'];
    $userID = $_SESSION['id'];

    $sql = "INSERT INTO egzaminy(userID, egzamin_data, egzamin_typ, wynik, dataStart) VALUES (:userID, :data_end, :typ, :wynik, :dataStart)";

    $request = $pdo->prepare($sql);

    $request->bindParam(':userID', $userID);
    $request->bindParam(':wynik', $wynik);
    $request->bindParam(':data_end', $data);
    $request->bindParam(':typ', $exam);
    $request->bindParam(':dataStart', $dataStart);

    $request->execute();
?>