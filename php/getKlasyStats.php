<?php 
    include_once('connection-users.php');
    $klasaID = $_POST['select-klasa-stats'];
    $examID = $_POST['select-exam-stats'];

    $sql = "SELECT egzaminy.wynik,users.klasa FROM egzaminy INNER JOIN users ON egzaminy.userID = users.id WHERE klasa = :klasaID AND egzamin_typ = :exam_type GROUP BY egzaminy.wynik;";
    $request = $pdo->prepare($sql);
    $request->bindParam(':klasaID',$klasaID);
    $request->bindParam(':exam_type', $examID);

    $request->execute();

    $response = $request->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($response));
?>