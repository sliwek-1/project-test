<?php 
    session_start();
    include_once('connection-users.php');
    if(!isset($_SESSION['id'])){
        header('Location: index.php');
    }

    if(!empty($_POST['id'])){
        $sql = "SELECT egzaminy.egzamin_typ, egzaminy.wynik FROM users inner join egzaminy on users.id = egzaminy.userID WHERE klasa = :id";
        $request = $pdo->prepare($sql);
        $request->bindParam(':id',$_POST['id']);
        $request->execute();
        $response = $request->fetchAll(PDO::FETCH_ASSOC);


        print_r(json_encode($response,  JSON_UNESCAPED_UNICODE));
    }else{

        $sql2 = "SELECT * FROM egzaminy WHERE userID = :userID";
        $request2 = $pdo->prepare($sql2);
        $request2->bindParam(':userID',$_SESSION['id']);
        $request2->execute();
        $response2 = $request2->fetchAll(PDO::FETCH_ASSOC);


        print_r(json_encode($response2,  JSON_UNESCAPED_UNICODE));

    }
?>