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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/choose-gamemode.css">
    <script src="./js/gamemode/choose-gamemode.js" defer></script>
    <title>Technik Informatyk Egzamin</title>
</head>
<body>
    <?php include_once('main-header.php') ?>
    <main class="main-choose">
            <section class="option">
                <h1>Classic mode</h1>
                <p>
                   Klasyczny tryb
                </p>
                <button class="choose-btn" data-id="classic">Wybierz</button>
            </section>
            <section class="option">
                <h1>Custom mode</h1>
                <p>
                    Wyświetlaj po jednym pytaniu
                </p>
                <button class="choose-btn" data-id="custom">Wybierz</button>
            </section>
            <section class="option">
                <h1>Custom mode 2.0</h1>
                <p>
                    Wyświetlaj po jednym pytaniu i odrazu uzyskaj odpowiedz
                </p>
                <button class="choose-btn" data-id="custom-2.0">Wybierz</button>
            </section>
    </main>
</body>
</html>