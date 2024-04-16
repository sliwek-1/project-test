<?php

    include_once('connection.php');

    $array = filter_input_array(INPUT_POST);

    $title = $array['title'];
    $poprawna_odp = $array['poprawna_odp'];
    $odpowiedzi = (array) $array['odpowiedzi'];
    $obrazek = $array['obrazek'] ?? null;
    $baza = $array['baza'];


    if(!empty($title) && !empty($poprawna_odp)){
        if(!empty($odpowiedzi['A']) && !empty($odpowiedzi['B']) && !empty($odpowiedzi['C']) && !empty($odpowiedzi['D'])) {
            if($_FILES['obrazek']) {
                $allowed_ext = ['png', 'jpg', 'jpeg', 'webp', 'mp4'];
                $new_name = explode(".", $_FILES['obrazek']['name']);

                if(in_array($new_name[1], $allowed_ext)) {
                    $docelowy = "../images/" . $new_name[0] . time() . "." . $new_name[1];
                    $sciezka = "./images/" . $new_name[0] . time() . "." . $new_name[1];

                    if(move_uploaded_file($_FILES['obrazek']['tmp_name'], $docelowy)) { 

                        if($baza == "inf03") {
                            $sql = "INSERT INTO inf03 (`title`, `obrazek`, `poprawna_odp`, `A`, `B`, `C`, `D`) VALUES (:title, :docelowy, :poprawna, :A, :B, :C, :D)";
                            $requset = $pdo->prepare($sql);
    
                            $requset->bindParam(':title', $title);
                            $requset->bindParam(':docelowy', $sciezka);
                            $requset->bindParam(':poprawna', $poprawna_odp);
                            $requset->bindParam(':A', $odpowiedzi['A']);
                            $requset->bindParam(':B', $odpowiedzi['B']);
                            $requset->bindParam(':C', $odpowiedzi['C']);
                            $requset->bindParam(':D', $odpowiedzi['D']);
    
                            $requset->execute();
                        } else {
                            $sql = "INSERT INTO pytania (`title`, `obrazek`, `poprawna_odp`, `A`, `B`, `C`, `D`) VALUES (:title, :docelowy, :poprawna, :A, :B, :C, :D)";
                            $requset = $pdo->prepare($sql);
    
                            $requset->bindParam(':title', $title);
                            $requset->bindParam(':docelowy', $sciezka);
                            $requset->bindParam(':poprawna', $poprawna_odp);
                            $requset->bindParam(':A', $odpowiedzi['A']);
                            $requset->bindParam(':B', $odpowiedzi['B']);
                            $requset->bindParam(':C', $odpowiedzi['C']);
                            $requset->bindParam(':D', $odpowiedzi['D']);
    
                            $requset->execute();
                        }
                
                    } else {
                        echo $_FILES['obrazek']['error'];
                    };

                } else {
                    echo "Twój plik zawiera niedozwolone rozszerzenie poprawnymi rozszerzeniami są: 'png', 'jpg', 'jpeg', 'webp', 'mp4' ";
                }
            } else {
                if($baza == "inf03") {
                    $sql = "INSERT INTO inf03 (`title`, `obrazek`, `poprawna_odp`, `A`, `B`, `C`, `D`) VALUES (:title, :docelowy, :poprawna, :A, :B, :C, :D)";
                    $requset = $pdo->prepare($sql);

                    $requset->bindParam(':title', $title);
                    $requset->bindParam(':docelowy', $obrazek);
                    $requset->bindParam(':poprawna', $poprawna_odp);
                    $requset->bindParam(':A', $odpowiedzi['A']);
                    $requset->bindParam(':B', $odpowiedzi['B']);
                    $requset->bindParam(':C', $odpowiedzi['C']);
                    $requset->bindParam(':D', $odpowiedzi['D']);

                    $requset->execute();
                } else {
                    $sql = "INSERT INTO pytania (`title`, `obrazek`, `poprawna_odp`, `A`, `B`, `C`, `D`) VALUES (:title, :docelowy, :poprawna, :A, :B, :C, :D)";
                    $requset = $pdo->prepare($sql);

                    $requset->bindParam(':title', $title);
                    $requset->bindParam(':docelowy', $obrazek);
                    $requset->bindParam(':poprawna', $poprawna_odp);
                    $requset->bindParam(':A', $odpowiedzi['A']);
                    $requset->bindParam(':B', $odpowiedzi['B']);
                    $requset->bindParam(':C', $odpowiedzi['C']);
                    $requset->bindParam(':D', $odpowiedzi['D']);

                    $requset->execute();
                }
            }
        } else {    
            echo "Odpowiedzi nie mogą być puste";
        }
    } else {    
        echo "Pola nie mogą być puste";
    }

    