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
    <script src="./js/showLastFiveExams.js" defer></script>
    <script src="./js/change-passwd.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Panel użytkownika</title>
</head>
<body>
    <?php include_once('header.php') ?>
    <input type="text" class="klasa-id" value="<?= $response['klasa'] ?>" hidden>
    <section class="container">
        <div class="user-results">
            <div class="avarage-result">
                <ol class="egzaminy">
                    <li class="egzamin input" data-id="wszystkie">Wszystkie</li>
                    <li class="egzamin input" data-id="inf02">INF.02</li>
                    <li class="egzamin input" data-id="inf03">INF.03</li>
                </ol>
                <div class="result">
                    <canvas id="wynik-chart" width="200" height="200"></canvas>
                </div>
            </div>
        </div>
        <div class="timeline-content">
            <div class="nav">
                <ol>
                    <li class="list-item" data-id="Wszystkie">Wszystkie</li>
                    <li class="list-item" data-id="inf02">INF.02</li>
                    <li class="list-item" data-id="inf03">INF.03</li>
                </ol>
            </div>
            <div class="timeline-results">
                <canvas id="timeline"></canvas>
            </div>
        </div>
        <div class="change-passwd-container">
            <div class="close-btn-section">
                <button class="close-change-passwd-btn">
                    <img src="./img/cancel.png" alt="zamknij" style="width: 18px; height: 18px;">
                </button>
            </div>
            <ul class="info">
                <li>Hasło powinno mieć przynajmniej z 8 znaków</li>
                <li>Posiadać conajmniej jedną cyfre, dużą litere oraz znak specjalny np: %$#?!</li>
            </ul>
            <form action="#" class="chnage-passwd">
                <input type="password" placeholder="Zmień hasło" name="passwd">
                <input type="text" name="userID" value="<?= $_SESSION['id'] ?>" hidden>
                <button type="submit" class="change-passwd-btn">Zmień</button>
            </form>
        </div>
    </section>
    <button class="change-passwd-user" type="submit">
        <img src="./img/key.png" alt="zmien haslo" style="width: 35px; height: 35px;">
    </button>
</body>
</html>