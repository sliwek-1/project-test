<?php 

    session_start();
    include_once('connection-users.php');

    function validate(string $data) : string{
        htmlspecialchars($data);
        trim($data);

        return $data;
    }

    $name = validate($_POST['user-name']);
    $surrname = validate($_POST['user-surname']);
    $login = validate($_POST['user-login']);
    $passwd = validate($_POST['user-password']);
    $klasa = validate($_POST['select-klasa']);

    if(!empty($login) & !empty($passwd) && !empty($name) & !empty($surrname) && !empty($klasa)){
        $regex = '/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/';
        if(preg_match($regex,$passwd)){
            $sql = "SELECT count(*) as 'count' FROM users WHERE login = :login AND haslo = :passwd";
            $request = $pdo->prepare($sql);

            $request->bindParam(':login',$login);
            $request->bindParam(':passwd',$passwd);

            $request->execute();

            $response = $request->fetch(PDO::FETCH_ASSOC);

            if($response['count'] >= 1){
                echo "Taki użytkownik już istnieje";
            }else{
                $sql2 = "INSERT INTO users(imie,nazwisko,klasa,haslo,login) VALUES (:imie, :nazwisko, :klasa, :haslo, :login)";
                $request2 = $pdo->prepare($sql2); 

                $request2->bindParam(':login',$login);
                $request2->bindParam(':haslo',$passwd);
                $request2->bindParam(':imie',$name);
                $request2->bindParam(':nazwisko',$surrname);
                $request2->bindParam(':klasa',$klasa);
                
                $request2->execute();

                if($request2){
                    echo "success";
                }else{
                    echo "Coś poszło nie tak";
                }
            }
        }else{
            echo "Hasło musi zawierać conajmniej 1 wielką literę, 1 cyfre oraz 1 znak specjalny i składać się conajmniej z 8 znaków";
        }
    }else{
        echo "Pola nie mogą być puste";
    }

?>