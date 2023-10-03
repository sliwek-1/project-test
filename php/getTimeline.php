<?php 

    session_start();
    include_once('connection-users.php');

    $id = $_POST['id'];

    if(isset($id)){
        if($id == "Wszystkie"){
            $sql = "SELECT wynik FROM egzaminy WHERE userID = :id ORDER BY dataStart DESC LIMIT 5";

            $request = $pdo->prepare($sql);
            $request->bindParam(':id', $_SESSION['id']);
            $request->execute();
            $response = $request->fetchAll(PDO::FETCH_ASSOC);
        
            print_r(json_encode($response));
        }else{
            $sql = "SELECT wynik FROM egzaminy WHERE userID = :id AND egzamin_typ = :typ ORDER BY dataStart DESC LIMIT 5";

            $request = $pdo->prepare($sql);
            $request->bindParam(':id', $_SESSION['id']);
            $request->bindParam(':typ', $id);
            $request->execute();
            $response = $request->fetchAll(PDO::FETCH_ASSOC);
        
            print_r(json_encode($response));
        }
    }
    
    