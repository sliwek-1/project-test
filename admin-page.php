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
    <script src="./js/generatorHasel.js" defer></script>
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
            <div class="edit-section-user">
                <button type="submit" class="close-btn"><img src="./img/cancel.png" style="width: 20px; height: 20px;" alt="cancel"></button>
                <form action="#" class="edit-user-data">
                    <input type="text" class="edit-id" name="user-number" value="" hidden>
                    <input type="text" class="user-name" name="user-name" placeholder="Imię">
                    <input type="text" class="user-surrname" name="user-surrname" placeholder="Nazwisko">
                    <input type="text" class="user-login" name="user-login" placeholder="Login">
                    <input type="password"  class="user-passwd" name="user-passwd" placeholder="Haslo">
                    <select name="select-klasa" id="select-klasy">
                        <option value="1Ti">1Ti</option>
                        <option value="1Tai">1Tai</option>
                        <option value="2Ti">2Ti</option>
                        <option value="3Tli">3Tli</option>
                        <option value="4Ti">4Ti</option>
                        <option value="5Ti">5Ti</option>
                    </select>
                    <select name="select-permision" id="select-permision">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    <button type="submit" class="edit-user-data-btn">Edytuj</button>
                </form>
            </div>
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
                        <div class="users-nav">
                            <span class="user-index option">Lp.</span>
                            <span class="user-number option">ID użytkownika</span>
                            <div class="user-name option">Imie/Nazwisko</div>
                            <div class="user-login option">Login</div>
                            <div class="user-klasa option">Klasa</div>
                            <div class="user-permision option">Permisje</div>
                            <div class="btns-section"></div>
                        </div>
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