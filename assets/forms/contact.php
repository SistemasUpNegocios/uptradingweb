<?php
	
	include('conn.php');
	$nombre = $_POST['nombre'];
	$correo = $_POST['correo'];
	$asunto = $_POST['asunto'];
	$msj = $_POST['msj'];	

	$sql = "INSERT INTO contacto (nombre, correo, asunto, msj) VALUES('$nombre', '$correo',  '$asunto','$msj')";
	$res = mysqli_query($conn, $sql);

	if ($res)
	{
		//echo 'Msj enviado';
	}
	else
	{
		echo mysqli_error($conn);
	}

?>