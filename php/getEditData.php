<?php 
    include_once('connection-users.php');

    $id = $_POST['userID'];

    $sql = "SELECT * FROM users WHERE id = :id";
    $request = $pdo->prepare($sql);
    $request->bindParam(':id',$id);

    $request->execute();

    $response = $request->fetch(PDO::FETCH_ASSOC);
    
    print_r(json_encode($response));
?>