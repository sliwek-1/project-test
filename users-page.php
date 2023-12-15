<?php 
    include_once('php/connection-users.php');
    session_start();

    $id = $_GET['userID'];
    $i = 1;
    $inf02 = [];
    $inf03 = [];
    $wynik = 0;

    if(!isset($id)){
        header("Location: admin-page.php");
    }

    $sql = "SELECT * FROM egzaminy WHERE userID = :id ORDER BY id DESC";
    $request = $pdo->prepare($sql);
    $request->bindParam(':id',  $id);

    $request->execute();

    $response = $request->fetchAll(PDO::FETCH_ASSOC);

    $sql2 = "SELECT imie, nazwisko FROM users WHERE id = :id";
    $request2 = $pdo->prepare($sql2);
    $request2->bindParam(':id',  $id);

    $request2->execute();

    $response2 = $request2->fetch(PDO::FETCH_ASSOC);

    function computeTime($dataStart, $dataEnd){
        $timeGap = $dataEnd - $dataStart;

        $minuty = floor($timeGap / 60000);
        $sekundy = floor(($timeGap % 60000) / 1000); 

        echo $minuty."m ".": ".$sekundy."s";
    }

    function computeDate($date){
        $timestamp_in_seconds = $date / 1000;
        $formatted_date = date('Y-m-d H:i:s', $timestamp_in_seconds);
        $formatted_time = $formatted_date;
        echo "$formatted_time";
    }

    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./js/detailsExam.js" defer></script>
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="./css/user-data.css">
    <title>Panel Użytkownika</title>
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="main.php"><img src="./img/logo.png" alt="logo" width="125px" height="50px"></a>
        </div>
        <?= $response2['imie']." ".$response2['nazwisko'] ?>
    </header>
    <div class="center">
        <section class="user-ezam-list">
            <table>
                <th>
                    
                    <td>ID.</td>
                    <td>Typ.</td>
                    <td>Wynik.</td>
                    <td>Czas.</td>
                    <td>Data Roz.</td>
                    <td>Szczegóły.</td>
                </th>
                <?php foreach($response as $row) { ?>
                        <tr>
                            <td><?= $i ?></td>
                            <td class="exam-id">
                                <?= $row['id'] ?>
                            </td>
                            <td>
                                <?= $row['egzamin_typ']; ?>
                            </td>
                            <td>
                                <?= $row['wynik']."%"; ?>
                            </td>
                            <td>
                                <?php computeTime($row['dataStart'],$row['egzamin_data']) ?>
                            </td>
                            <td>
                                <?php computeDate($row['dataStart']) ?>
                            </td>
                            <td>
                                <button type="submit" class="btn">Więcej</button>
                            </td>
                        </tr>
                    <?php 
                        if($row['egzamin_typ'] == 'inf02'){
                            array_push($inf02, $row['wynik']); 
                        }else{
                            array_push($inf03, $row['wynik']); 
                        }
                    ?>
                    <?php $i++; ?>
                <?php } ?>
            </table>
        </section>
        <div class="exam-results">
            <span class="result">
                Średni wynik inf02: 
                <?php 
                    $wynik = 0;
                    if(count($inf02) > 0){
                        foreach($inf02 as $ar){ 
                            $wynik += $ar;
                        }
        
                        echo floor($wynik/count($inf02))."%";
                    }else{
                        echo "0%";
                    }
                ?>
            </span>
            <span class="result">
                Średni wynik inf03: 
                <?php 
                    $wynik = 0;
                    if(count($inf03) > 0){
                        foreach($inf03 as $ar){ 
                            $wynik += $ar;
                        }
                        echo floor($wynik/count($inf03))."%";
                    }else{
                        echo "0%";
                    }
                ?>
            </span>
        </div>
    </div>
</body>
</html>