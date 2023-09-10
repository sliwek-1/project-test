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
    <link rel="stylesheet" href="./css/progress.css">
    <link rel="stylesheet" href="./css/header.css">
    <script src="./js/generateExamData.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Panel użytkownika</title>
</head>
<body>
    <?php include_once('header.php') ?>
    <section class="container">
        <div class="user-results">
            <div class="avarage-result">
                <ol class="egzaminy">
                    <li class="egzamin" data-id="wszystkie">Wszystkie</li>
                    <li class="egzamin" data-id="inf02">INF.02</li>
                    <li class="egzamin" data-id="inf03">INF.03</li>
                </ol>
                <div class="result">
                    <canvas id="wynik-chart" width="200" height="200"></canvas>
                </div>
            </div>
        </div>
    </section>
</body>
</html>