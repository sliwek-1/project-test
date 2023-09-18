<header class="header">
        <div class="logo">
            <a href="main.php"><img src="./img/logo.png" alt="logo" width="125px" height="50px"></a>
        </div>
        <div class="nav">
            <div class="user-panel">
                <?= $response['imie']." ".$response['nazwisko'] ?>
            </div>
            <div class="menu">
                <a href="php/logout.php?userID=<?= $_SESSION['id'] ?>" class="btn-bar logout">Wyloguj</a>
            </div>
        </div>
</header>