<?php 
    session_start();
    include_once('connection-users.php');
    try{
        $data = $_POST['date-end'];
        $dataStart = $_POST['data-start'];
        $wynik = $_POST['wynik'];
        $exam = $_POST['exam-id'];
        $userID = $_SESSION['id'];
        $userActions = json_decode($_POST['userActions'], true);
        $i = 0;
    
        $sql = "INSERT INTO egzaminy(userID, egzamin_data, egzamin_typ, wynik, dataStart) VALUES (:userID, :data_end, :typ, :wynik, :dataStart)";
    
        $request = $pdo->prepare($sql);
    
        $request->bindParam(':userID', $userID);
        $request->bindParam(':wynik', $wynik);
        $request->bindParam(':data_end', $data);
        $request->bindParam(':typ', $exam);
        $request->bindParam(':dataStart', $dataStart);
    
        $request->execute();


        $sql2 = "SELECT id FROM egzaminy WHERE dataStart = :dataStart";
        $request2 = $pdo->prepare($sql2);
        $request2->bindValue(':dataStart', $dataStart);
        $request2->execute();

        $response2 = $request2->fetch(PDO::FETCH_ASSOC);
        $exam_id = $response2['id'];
        
        foreach($userActions as $row){
            $sql3 = "INSERT INTO useractions(exam_id, user_id, action) VALUES (:exam_id, :user_id, :action)";
            $request3 = $pdo->prepare($sql3);
            $request3->bindValue(':exam_id', $exam_id);
            $request3->bindValue(':user_id', $userID);
            $request3->bindValue(':action', $row['data']);

            $request3->execute();
            $i++;
        }

    }catch(PDOException $e){
        echo "Something went wrong: ".$e->getMessage();
    }
?>