<?php 
    include_once('connection-users.php');
    session_start();

    $passwd = $_POST['passwd'];
    $id = $_POST['userID'];

    $regex = '/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/'; //Sprawdza czy haslo zawiera duze litery cyfry oraz znaki specjalne i sklada sie z conajmniej 8 znaków;
    if(preg_match($regex,$passwd)){
        $sql = "UPDATE users SET haslo = :passwd WHERE id = :userID";
        $request = $pdo->prepare($sql);
        $request->bindParam(':passwd',$passwd);
        $request->bindParam(':userID',$id);

        $request->execute();

        $_SESSION = array();
        session_destroy();
        echo "success";
    }else{
        echo "Hasło musi zawierać conajmniej 1 wielką literę, 1 cyfre oraz 1 znak specjalny i składać się conajmniej z 8 znaków";
    }
?>