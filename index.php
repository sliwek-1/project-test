<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <script src="./js/login.js" defer></script>
    <script src="./js/show-passwd.js" defer></script>
    <title>Logowanie</title>
</head>
<body>
    <main class="main-login">
        <div class="info-login">
                
        </div>
        <div class="login-form">
            <h1>Logowanie</h1>
            <form action="#" class="form">
                <input type="text" name="login" placeholder="Login">

                <input type="password" name="passwd" placeholder="Hasło" class="passwd-input">

                <label for="passwd">
                    Pokaż hasło: <input type="checkbox" name="show-passwd" id="show-passwd">
                </label>
                <button type="submit" class="submit">Zaloguj</button>
            </form>
            <a href="./main.php">Przejdź do Bazy pytań</a>
        </div>
        <div class="background"></div>
    </main>
</body>
</html>
