<?php 

    include_once("connection.php");
    error_reporting(0);
    
    $pageNumber = $_POST['page'];
    $postsOnPage = 50;
    $offset = $pageNumber * $postsOnPage;
    

    $sql = "SELECT * FROM pytania LIMIT :offset, :postOnPage"; 

    

    $request = $pdo->prepare($sql);

    $request->bindParam(':offset', $offset, PDO::PARAM_INT);
    $request->bindParam(':postOnPage', $postsOnPage, PDO::PARAM_INT);

    $request->execute();

    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($result, JSON_UNESCAPED_UNICODE);
    $jsonData = str_replace('\/', '/', $jsonData);

    header('Content-Type: application/json; charset=utf-8');
    print_r($jsonData);
?>