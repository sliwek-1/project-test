<?php 
    include_once('php/connection-users.php');
    session_start();

    $id = $_GET['userID'];
    $i = 1;
    $array = [];
    $wynik = 0;

    if(!isset($id)){
        header("Location: admin-page.php");
    }
    $sql = "SELECT * FROM egzaminy WHERE userID = :id";
    $request = $pdo->prepare($sql);
    $request->bindParam(':id',  $id);

    $request->execute();

    $response = $request->fetchAll(PDO::FETCH_ASSOC);

    function computeTime($dataStart, $dataEnd){
        $timeGap = $dataEnd - $dataStart;

        $minuty = floor($timeGap / 60000);
        $sekundy = floor(($timeGap % 60000) / 1000); 

        echo $minuty."m ".": ".$sekundy."s";
    }

    function computeDate($date){
        $timestamp_in_seconds = $date / 1000;
        $formatted_date = date('Y-m-d H:i:s', $timestamp_in_seconds);
        $milliseconds = substr($date, -3);
        $formatted_time = $formatted_date . '.' . $milliseconds;
        echo "$formatted_time";
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/header.css">
    <title>Document</title>
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="main.php"><img src="./img/logo.png" alt="logo" width="125px" height="50px"></a>
        </div>
    </header>
    <section class="user-ezam-list">
        <?php foreach($response as $row) { ?>
            <div class="exam">
                <span class="exam-number"><?= $i ?></span>
                <span class="exam-typ"><?= $row['egzamin_typ']; ?></span>
                <span class="wynik"><?= $row['wynik']."%"; ?></span>
                <span class="time"> <?php computeTime($row['dataStart'],$row['egzamin_data']) ?> </span>
                <span class="data-start"><?php computeDate($row['dataStart']) ?></span>
            </div>

            <?php array_push($array, $row['wynik']); ?>
            <?php $i++; ?>
        <?php } ?>
    </section>
    <span>Średni wynik: 
        <?php 
            foreach($array as $ar){ 
                $wynik += $ar;
            }

            echo floor($wynik/count($array))."%";
        ?>
    </span>
</body>
</html>