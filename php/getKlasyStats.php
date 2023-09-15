<?php 
    include_once('connection-users.php');
    $klasaID = $_POST['select-klasa-stats'];
    
    if($klasaID == "wszystkie"){
        $sql = "SELECT egzaminy.wynik,users.klasa FROM egzaminy INNER JOIN users ON egzaminy.userID = users.id GROUP BY egzaminy.wynik;";
        $request = $pdo->prepare($sql);

        $request->execute();

        $response = $request->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($response));
    }else{
        $sql = "SELECT egzaminy.wynik,users.klasa FROM egzaminy INNER JOIN users ON egzaminy.userID = users.id WHERE klasa = :klasaID GROUP BY egzaminy.wynik;";
        $request = $pdo->prepare($sql);
        $request->bindParam(':klasaID',$klasaID);

        $request->execute();

        $response = $request->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($response));
    }
?>