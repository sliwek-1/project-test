<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Baza Pytań</title>
    <style> 
        .header{
            width: 100vw;
            height:100vh;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap:50px;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Wybierz Baze Pytań</h1>
        <ol class="list">
            <li class="list-item db-btn" data-db="inf02"><a href="./inf02.php">Inf.02</a></li>
            <li class="list-item db-btn" data-db="inf03"><a href="./inf03.php">Inf.03</a></li>
        </ol>
    </header>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
