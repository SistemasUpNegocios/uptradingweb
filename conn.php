<?php







$host_db = "localhost";

$user_db = "root";

$pass_db = "";

$db_name = "up";











// $host_db = "127.0.0.1";



// $user_db = "upnegoci_uptradingapp";



// $pass_db = "30UP-NTE1122";



// $db_name = "upnegoci_uptradingapp";















$conn = new mysqli($host_db, $user_db, $pass_db, $db_name);



if (!$conn->set_charset("utf8")) {



    // printf("Error cargando el conjunto de caracteres utf8: %s\n", $conn->error);



    exit();



} else {



    // printf("Conjunto de caracteres actual: %s\n", $conn->character_set_name());



}



?>