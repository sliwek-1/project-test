<?php 
    session_start();
    include_once('php/connection-users.php');
    $userID = $_SESSION['id'];

    $sql = "SELECT imie, nazwisko, permision FROM users WHERE id = :userID";
    $request = $pdo->prepare($sql);
    $request->bindParam(':userID', $userID);
    $request->execute();
    $response = $request->fetch(PDO::FETCH_ASSOC);

    if(!isset($_SESSION['id'])){
        header('Location: main.php');
    }else{
        if($response['permision'] == "user"){
            header('Location: main.php');
        }
    }
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="./css/admin.css">
    <title>Panel Administratora</title>
</head>
<body>
    <?php include_once('header.php') ?>
    <main class="main">
        <nav class="navigation">
            <ol class="menu">
                <li class="list-item">
                    <img src="./img/user.png" class="nav-img" alt="user">
                    Użytkownicy
                </li>
                <li class="list-item">
                    <img src="./img/group.png" class="nav-img" alt="user">
                    Grupy użytkowników
                </li>
                <li class="list-item">
                    <img src="./img/stats.png" class="nav-img" alt="user">   
                    Statystyki
                </li>
            </ol>
        </nav>
    </main>
</body>
</html>