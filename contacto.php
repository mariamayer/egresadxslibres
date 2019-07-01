<?php
$remitente = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_EMAIL);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$destinatario = 'libresegresadxs@hotmail.com'; // en esta línea va el mail del destinatario, puede ser una cuenta de hotmail, yahoo, gmail, etc
$asunto = 'Mensaje desde Egresadxs'; // acá se puede modificar el asunto del mail
if (!$_POST){
?>

<?php
}else{

    if(isset($_POST['comments'])){
        $comments 	 = $_POST['coments'];
    $cuerpo = "Nombre: " . $_POST["nombre"] . "\r \n";
    $cuerpo .= "Correo: " . $_POST["email"] . "\r \n";
    $cuerpo .= "Escuela: " . $_POST["school"] . "\r \n";
    $cuerpo .= "Telefono: " . $_POST["subject"] . "\r \n";
    $cuerpo .= "Mensaje: " . $_POST["mensaje"] . "\r \n";

        $cuerpo = '
        <html>
        <head>
          <title>Nuevo presupuesto de '. $nombre .'</title>
        </head>
        <body>
          <table class="table">
            <tr>
              <th align="right">E-mail:</th>
              <td align="left">'. $email .'</td>
            </tr>
            <tr>
                <th align="right">Comentarios:</th>
                <td align="left">'. $comments .'</td>
            </tr>';

        foreach ($_POST as $key => $value) {
            $k = htmlspecialchars($key);
            $k = ucfirst(str_replace('-', ' ', $k));
            if($value !== '') {
                $cuerpo .=  '<tr><th align="right"> '.$k.' </th><td align="left"> '.htmlspecialchars($value).'</td></tr>';
            }
        }

        $cuerpo .= '</table></body></html>';
    } else {

        $cuerpo = "Nombre: " . $_POST["nombre"] . "\r \n";
        $cuerpo .= "Correo: " . $_POST["email"] . "\r \n";
        $cuerpo .= "Escuela: " . $_POST["escuela"] . "\r \n";
        $cuerpo .= "Mensaje: " . $_POST["mensaje"] . "\r \n";

    	//las líneas de arriba definen el contenido del mail. Las palabras que están dentro de $_POST[""] deben coincidir con el "name" de cada campo.
    	// Si se agrega un campo al formulario, hay que agregarlo acá.
    }

    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "X-Priority: 3\n";
    $headers .= "X-MSMail-Priority: Normal\n";
    $headers .= "X-Mailer: php\n";
    $headers .= "From: \"".$nombre." ".$email."\" <".$remitente.">\n";

    mail($destinatario, $asunto, $cuerpo, $headers);

    include 'confirma_contacto.html'; //se debe crear un html que confirma el envío
}
?>
