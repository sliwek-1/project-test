<?php 
    ob_start();
    include_once('connection.php');
    //error_reporting(0);

    if(isset($_POST['count'])){
        $count = $_POST['count'];
        $data = array();
        for($i = 1; $i <= $count; $i++){
            $randomID = random_int(1,2270);

            $sql = "SELECT * FROM pytania WHERE ID = :id";

            $request = $pdo->prepare($sql);

            $request->bindParam(':id', $randomID);

            $request->execute();
            
            $result = $request->fetchAll(PDO::FETCH_ASSOC);
            $data[] = $result[0];   
        }
            $jsonData = json_encode($data, JSON_UNESCAPED_UNICODE);
            $jsonData = str_replace('\/', '/', $jsonData);

            header('Content-Type: application/json; charset=utf-8');
            echo $jsonData;

    }
    ob_end_flush();