<?php 

    include_once('connection-users.php');

    $id = $_POST['user-number'];
    $userName = $_POST['user-name'];
    $userSurrname = $_POST['user-surrname'];
    $userLogin = $_POST['user-login'];
    $userPasswd = $_POST['user-passwd'];
    $klasaSelect = $_POST['select-klasa'];
    $permisionSelect = $_POST['select-permision'];
    

    $sql = "UPDATE users SET imie = :imie, nazwisko = :nazwisko, login = :login, haslo = :haslo, klasa = :klasa, permision = :permision";

?>