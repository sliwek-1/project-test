<?php 
    session_start();
    include_once('connection-users.php');

    function validate(string $data) : string{
        htmlspecialchars($data);
        trim($data);

        return $data;
    }

    $login = validate($_POST['login']);
    $passwd = validate($_POST['passwd']);

    if(!empty($login) & !empty($passwd)){
        $regex = '/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/';
        if(preg_match($regex,$passwd)){
            $sql = "SELECT count(*) as 'count' FROM users WHERE login = :login AND haslo = :passwd";
            $request = $pdo->prepare($sql);

            $request->bindParam(':login',$login);
            $request->bindParam(':passwd',$passwd);

            $request->execute();

            $response = $request->fetch(PDO::FETCH_ASSOC);

            if($response['count'] >= 1){
                $sql2 = "SELECT id FROM users WHERE login = :login AND haslo = :passwd";
                $request2 = $pdo->prepare($sql2); 

                $request2->bindParam(':login',$login);
                $request2->bindParam(':passwd',$passwd);

                $request2->execute();

                $response2 = $request2->fetch(PDO::FETCH_ASSOC);

                if($request2){
                    $_SESSION['id'] = $response2['id'];
                    echo "success";
                }else{
                    echo "Coś poszło nie tak";
                }
            }else{
                echo "Nie ma takiego użytkownika";
            }
        }else{
            echo "Hasło musi zawierać conajmniej 1 wielką literę, 1 cyfre oraz 1 znak specjalny i składać się conajmniej z 8 znaków";
        }
    }else{
        echo "Pola nie mogą być puste";
    }
?>