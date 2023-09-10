<?php 
    session_start();
    include_once('./php/connection-users.php');

    if(!isset($_SESSION['id'])){
        header('location: main.php');
    }

    $sql = "SELECT imie, nazwisko, klasa, permision FROM users WHERE id = :id";

    $request = $pdo->prepare($sql);
    $request->bindParam(':id', $_SESSION['id']);
    $request->execute();

    $response = $request->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/index.css">
    <title>Panel użytkownika</title>
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="main.php"><img src="./img/logo.png" alt="logo" width="125px" height="50px"></a>
        </div>
        <div class="nav">
            <div class="user-panel">
                <?= $response['imie']." ".$response['nazwisko'] ?>
            </div>
            <div class="menu">
                <a href="logout.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar logout">Wyloguj</a>
            </div>
        </div>
    </header>
    <section class="container">
  
    </section>
</body>
</html>