<?php 
    include_once("connection-users.php");
    $id = $_POST['klasaID'];

    if($id == "wszystkie"){
        $sql = "SELECT id,imie, nazwisko, login, klasa, permision FROM users";
        $request = $pdo->prepare($sql);
        $request->execute();
        $response = $request->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($response));
    }else{
        $sql = "SELECT id, imie, nazwisko, login, klasa, permision FROM users WHERE klasa = :klasa";
        $request = $pdo->prepare($sql);
        $request->bindParam(':klasa',$id);
        $request->execute();
        $response = $request->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($response));
    }

?>

