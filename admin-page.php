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
    <script src="./js/change-page-admin.js" defer></script>
    <script src="./js/sendUserData.js" defer></script>
    <title>Panel Administratora</title>
</head>
<body>
    <?php include_once('header.php') ?>
    <main class="main">
        <nav class="navigation">
            <ol class="menu">
                <li class="list-item"  data-id="user">
                    <img src="./img/user.png" class="nav-img" alt="user">
                    Użytkownicy
                </li>
                <li class="list-item"  data-id="user-group">
                    <img src="./img/group.png" class="nav-img" alt="user">
                    Grupy użytkowników
                </li>
                <li class="list-item" data-id="stats">
                    <img src="./img/stats.png" class="nav-img" alt="user">   
                    Statystyki
                </li>
            </ol>
        </nav>
        <section class="section user active" data-id="user">
            <article class="user-manage">
                <div class="nav">
                    <button class="add-user">
                        <img src="./img/add-user.png" alt="add-user">
                    </button>
                    <div class="klasy">
                        <ol class="klasy">
                            <li class="klasa" data-id="wszystkie">Wszystkie</li>
                            <li class="klasa" data-id="1ti">1Ti</li>
                            <li class="klasa" data-id="1tai">1Tai</li>
                            <li class="klasa" data-id="2ti">2Ti</li>
                            <li class="klasa" data-id="3tli">3Tli</li>
                            <li class="klasa" data-id="4ti">4Ti</li>
                            <li class="klasa" data-id="5ti">5Ti</li>
                        </ol>
                    </div>  
                </div>
                <article class="content">
                    <div class="display-users article active">
                        <div class="users-nav"></div>
                        <div class="users">

                        </div>
                    </div>
                    <div class="add-user-form article">
                        <h1>Dodaj użytkownika</h1>
                        <form action="#" class="form-add-user">
                            <input type="text" name="user-name" placeholder="Imie">
                            <input type="text" name="user-surname" placeholder="Nazwisko">
                            <input type="text" name="user-login" placeholder="Login">
                            <div class="password-section">
                                <input type="password" class="password-input" name="user-password" placeholder="Hasło">
                                <button class="random-password">
                                    <img src="./img/casino.png" style="width: 20px; height: 20px;" alt="cube img">
                                </button>
                            </div>
                            <select name="select-klasa" id="select-klasa">
                                <option value="1Ti">1Ti</option>
                                <option value="1Tai">1Tai</option>
                                <option value="2Ti">2Ti</option>
                                <option value="3Tli">3Tli</option>
                                <option value="4Ti">4Ti</option>
                                <option value="5Ti">5Ti</option>
                            </select>
                            <button type="submit" class="send-user-data">Dodaj</button>
                        </form>
                    </div>
                </article>
            </article>
        </section>
        <section class="section user-group" data-id="user-group">
        </section>
        <section class="section user-stats" data-id="stats">
        </section>
    </main>
</body>
</html>