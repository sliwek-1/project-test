<?php 
    session_start();
    include_once('./php/connection-users.php');

    if(!isset($_SESSION['id'])){
        header('location: login.php');
    }

    $sql = "SELECT imie, nazwisko, permision FROM users WHERE id = :id";

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
            <?php if($response['permision'] == "admin") { ?>

                <nav class="navigation">
                    <div class="logo">
                        <img src="./img/logo.png" alt="logo">
                    </div>
                    <div class="bar">
                        <a href="admin.php?userID=<?= $_SESSION['id'] ?>" class="btn admin">Admin</a>
                        <a href="logout.php?userID=<?= $_SESSION['id'] ?>" class="btn logout">Wyloguj</a>
                    </div>
                </nav>

            <?php } else { ?>

                <nav class="navigation">
                    <div class="logo">
                        <img src="./img/logo.png" alt="logo">
                    </div>
                    <div class="bar">
                        <a href="logout.php?userID=<?= $_SESSION['id'] ?>" class="btn logout">Wyloguj</a>
                    </div>
                </nav>

            <?php } ?>
        </header>
        <section class="container">
            
        </section>
    </main>
</body>
</html>