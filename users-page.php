<?php 
    include_once('php/connection-users.php');
    session_start();

    $id = $_GET['userID'];

    if(!isset($id)){
        header("Location: admin-page.php");
    }

    $sql = "SELECT users.imie,users.nazwisko, users.klasa, egzaminy.* FROM users INNER JOIN egzaminy ON users.id = egzaminy.userID WHERE users.id = :id";
    $request = $pdo->prepare($sql);
    $request->bindParam(':id',  $id);

    $request->execute();

    $response = $request->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/header.css">
    <title>Użytkownik</title>
</head>
<body>

</body>
</html>