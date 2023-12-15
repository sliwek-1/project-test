<?php 
    session_start(); 
    require_once('php/connection-users.php');

    $sql = "SELECT * FROM users WHERE id = :id";

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
    <script src="./js/sidebar.js" defer></script>
    <?php if(isset($_SESSION['id'])) { ?>
        <script type="module" src="./js/losowanie.js" defer></script>
        <script type="module" src="./js/anticheat.js" defer></script>
        <script type="module" src="./js/saveStartedExamToDatabase.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <?php } ?>
    <title>Baza Pytań</title>
</head>
<body>
    <header class="header">
        <div class="logo">
            <img src="./img/logo.png" alt="GLE">
        </div>
        <h1>Technik Informatyk - Gronowo</h1>
        <nav class="navigation">
            <?php if(isset($_SESSION['id'])) { ?>
                <?php if($response['permision'] == "admin") { ?>

                    <nav class="navigation">
                        <div class="bar">
                            <a href="progress.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar progress"> <?= $response['imie']." ".$response['nazwisko'] ?></a>
                            <a href="admin-page.php" class="btn-bar admin">Admin</a>
                            <a href="logout.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar logout">Wyloguj</a>
                        </div>
                    </nav>

                    <?php } else { ?>

                    <nav class="navigation">
                        <div class="bar">
                            <a href="progress.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar progress">Profil</a>
                            <a href="logout.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar logout">Wyloguj</a>
                        </div>
                    </nav>

                <?php } ?>

            <?php } else { ?>
                <a href="./index.php" class="btn-bar login-btn">
                    <img src="./img/user.png" class="login-img" alt="user img">
                    Zaloguj
                </a>
            <?php } ?>
        </nav>
    </header>
    <div class="center">
        <aside class="sidebar">
            <div class="nav-sidebar">
                <button class="btn-forward btn">
                    <ion-icon class="btn-content" name="arrow-back-outline"></ion-icon>
                </button>
                <button class="btn-back btn">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
            </div>
            <div class="side-content">
                <h2>Bazy Pytań</h2>
                <ol class="list">
                    <a href="./inf02.php"><li class="db-btn">Inf.02</li></a>
                    <a href="./inf03.php"><li class="db-btn">Inf.03</li></a>
                </ol>
            </div>
            <div class="side-content">
                <?php if(isset($_SESSION['id'])) { ?>
                    <h2>Egzaminy</h2>
                    <ol class="list">
                        <li class="list-itemE">Testy Inf.02
                            <ul class="list">
                                <li class="list-item" data-id="inf02-40">Losuj 40 pytań z egzaminu Inf.02</li>
                                <li class="list-item" data-id="inf02-1">Losuj po 1 pytaniu z egzaminu Inf.02</li>
                            </ul>
                        </li>
                        <li class="list-itemE">Testy Inf.03
                            <ul class="list">
                                <li class="list-item" data-id="inf03-40">Losuj 40 pytań z egzaminu Inf.03</li>
                                <li class="list-item" data-id="inf03-1">Losuj po 1 pytaniu z egzaminu Inf.03</li>
                            </ul>
                        </li>
                    </ol>
                <?php } ?>
            </div>
            <p class="copyright">&copy; Mateusz Śliwinski</p>
        </aside>
        <section class="saveExam">
            <button class="startExam">Rozpocznij egzamin</button>
        </section>
        <main class="main">
            <input type="text" class="exam-id" value="" hidden>
            <div class="result">
                <div class="result-title"></div>
                <div class="wynik"></div>
                <div class="procent"></div>
                <div class="userActions"></div>
            </div>
            <div class="question-center">
            </div>
            <div class="btn-center"></div>
        </main>
    </div>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
