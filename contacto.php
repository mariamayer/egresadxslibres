<?php
$remitente = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_EMAIL);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$destinatario = 'marupezzati@gmail.com'; // en esta línea va el mail del destinatario, puede ser una cuenta de hotmail, yahoo, gmail, etc
$asunto = 'Mensaje desde Egresadxs'; // acá se puede modificar el asunto del mail
if (!$_POST){
?>

<?php
}else{

    $cuerpo = "Nombre: " . $_POST["nombre"] . "\r \n";
    $cuerpo .= "Correo: " . $_POST["email"] . "\r \n";
    $cuerpo .= "Escuela: " . $_POST["escuela"] . "\r \n";
    $cuerpo .= "Mensaje: " . $_POST["mensaje"] . "\r \n";

	//las líneas de arriba definen el contenido del mail. Las palabras que están dentro de $_POST[""] deben coincidir con el "name" de cada campo.
	// Si se agrega un campo al formulario, hay que agregarlo acá.

    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/plain; charset=utf-8\n";
    $headers .= "X-Priority: 3\n";
    $headers .= "X-MSMail-Priority: Normal\n";
    $headers .= "X-Mailer: php\n";
    $headers .= "From: \"".$nombre." ".$email."\" <".$remitente.">\n";

    mail($destinatario, $asunto, $cuerpo, $headers);

    include 'confirma_contacto.html'; //se debe crear un html que confirma el envío
}
?>
