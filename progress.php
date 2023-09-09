<?php 
    session_start();
    include_once('./php/connection-users.php');

    if(!isset($_SESSION['id'])){
        header('location: index.php');
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
    <title>Panel użytkownika</title>
</head>
<body>
    <main class="main">
        <header class="header">
        </header>
        <section class="container">

        </section>
    </main>
</body>
</html>