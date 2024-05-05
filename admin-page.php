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
    <script src="./js/send-stats.js" defer></script>
    <script src="./js/send-new-question.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
                <li class="list-item" data-id="stats">
                    <img src="./img/stats.png" class="nav-img" alt="user">   
                    Statystyki
                </li>
                <li class="list-item" data-id="add-question">
                    <img src="./img/stats.png" class="nav-img" alt="user">   
                    Dodaj Pytanie
                </li>
                <li class="list-item" data-id="add-user">
                    <img src="./img/add-user.png" class="nav-img" alt="user">   
                    Dodaj Użytkownia
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
                <article class="content">
                    <div class="display-users article active">
                        <div class="nav">
                            <div class="klasy">
                                <ol class="klasy">
                                    <li class="klasa option" data-id="wszystkie">Wszystkie</li>
                                    <li class="klasa option" data-id="1ti">1Ti</li>
                                    <li class="klasa option" data-id="1tai">1Tai</li>
                                    <li class="klasa option" data-id="2ti">2Ti</li>
                                    <li class="klasa option" data-id="3tli">3Tli</li>
                                    <li class="klasa option" data-id="4ti">4Ti</li>
                                    <li class="klasa option" data-id="5ti">5Ti</li>
                                </ol>
                            </div>  
                        </div>  
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
                        <div class="delete-section">
                            <p class="info-delete">Czy napewno chcecz usunąć użytkownika?</p>
                            <div class="btn-sec-del">
                                <button type="submit" class="btn yes">Tak</button>
                                <button type="submit" class="btn no">Nie</button>   
                            </div>
                        </div>  
                    </div>
                </article>
            </article>
        </section>
        <section class="section user-stats-chart" data-id="stats">
            <header class="stats-header">
                <form action="#" class="stats-form">
                    <select name="select-exam-stats" id="select-exam-stats">
                        <option value="inf02">Inf.02</option>
                        <option value="inf03">Inf.03</option>
                    </select>
                    <select name="select-klasa-stats" id="select-klasa-stats">
                        <option value="1Ti">1Ti</option>
                        <option value="1Tai">1Tai</option>
                        <option value="2Ti">2Ti</option>
                        <option value="3Tli">3Tli</option>
                        <option value="4Ti">4Ti</option>
                        <option value="5Ti">5Ti</option>
                    </select>
                    <button type="submit" class="send-klasa-stats">Wyświetl</button>
                </form>
            </header>
            <article class="center-stats">
                <canvas id="klasa-stats" width="200px" height="200px"></canvas>
            </article>
        </section>
        <section class="section" data-id="add-question">
            <section class="user-question-section">
                <form action="#" method="POST">

                    <label for="title">Wpisz Pytanie</label>
                    <textarea name="title" id="title" cols="30" rows="10" required></textarea>

                    <div class="img-choose">
                        <div class="img-choose-area">
                            <label for="link-img">Link do zdjęcia</label>
                            <input type="radio" id="link-img"  name="link-img" class="img-input" data-id="link">

                            <label for="link-img">Wyślij plik na server</label>
                            <input type="radio" id="file-img"  name="link-img" class="img-input" data-id="file">
                        </div>

                        <div class="img-area">
                            <label for="link-img">Link do zdjęcia</label>
                            <input type="text" id="link-img-input"  name="link-img" class="img-input">

                            <label for="link-img">Wyślij plik na server</label>
                            <input type="file" id="file-img-input"  name="file-img" class="img-input">
                        </div>
                    </div>
                    
                    <label for="poprawna_odp">Wybierz poprawną odpowiedz</label>
                    <select name="poprawna_odp" id="poprawna_odp">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <label for="baza">Wybierz baze danych</label>
                    <select name="baza" id="baza">
                        <option value="pytania">INF.02</option>
                        <option value="inf03">INF.03</option>
                    </select>

                    <div class="question-section">
                            <label for="A">ODP. A</label>
                            <textarea name="A" id="A" cols="30" rows="10" required></textarea>

                            <label for="B">ODP. B</label>
                            <textarea name="B" id="B" cols="30" rows="10" required></textarea>

                            <label for="C">ODP. C</label>
                            <textarea name="C" id="C" cols="30" rows="10" required></textarea>
 
                            <label for="D">ODP. D</label>
                            <textarea name="D" id="D" cols="30" rows="10" required></textarea>
                    </div>

                    <button type="submit" class="btn-add-quaetion">Wyślij</button>
                </form>
            </section>
        </section>
        <section class="section add-user-form article" data-id="add-user">
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
                <div class="show-passwd">
                    Pokaż hasło:  <input type="checkbox" class="password-show">
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
        </section>
    </main>
</body>
</html>