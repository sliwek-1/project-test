<?php 
    include_once('php/connection-users.php');
    session_start();

    $id = $_GET['userID'];

    if(!isset($id)){
        header("Location: admin-page.php");
    }

    $sql = "SELECT * FROM egzaminy WHERE userID = :id";
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
    <?php foreach($response as $row) { ?>
        <?php 
            $dataStart = $row['dataStart'];
            $dataEnd = $row['egzamin_data'];
            
            echo ($dataEnd/1000) - ($dataStart/1000);
        ?>
    <?php } ?>
</body>
</html>