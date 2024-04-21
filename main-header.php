<header class="header">
    <div class="logo">
        <a href="main.php">
            <img src="./img/logo.png" alt="GLE">
        </a>
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