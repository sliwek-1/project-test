<?php 

    require_once('connection-users.php');

    try{    

        $examID = $_POST['examID'];
        $userID = $_POST['userID'];

        $sql = "SELECT * FROM useractions WHERE exam_id = :examID and user_id = :userID";
        $request = $pdo->prepare($sql);
        $request->bindParam(':examID', $examID);
        $request->bindParam(':userID', $userID);
        $request->execute();

        $response = $request->fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($response));

    }catch(PDOException $e){
        echo "Something went wrong:  ".$e->getMessage();
    }