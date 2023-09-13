<?php 

    include_once('connection-users.php');

    $id = $_POST['user-number'];
    $userName = $_POST['user-name'];
    $userSurrname = $_POST['user-surrname'];
    $userLogin = $_POST['user-login'];
    $userPasswd = $_POST['user-passwd'];
    $klasaSelect = $_POST['select-klasa'];
    $permisionSelect = $_POST['select-permision'];
    

    $sql = "UPDATE users SET imie = :imie, nazwisko = :nazwisko, login = :login, haslo = :haslo, klasa = :klasa, permision = :permision WHERE ";
    $request = $pdo->prepare($sql);

    $request->bindParam(':imie', $userName);
    $request->bindParam(':nazwisko', $userSurrname);
    $request->bindParam(':login', $userLogin);
    $request->bindParam(':haslo', $userPasswd);
    $request->bindParam(':klasa', $klasaSelect);
    $request->bindParam(':permision', $permisionSelect);

    $request->execute();

    if($request){
        echo "SUCCESS";
    }

?>