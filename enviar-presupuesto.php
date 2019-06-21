<?php

	/* ==========================  Define variables ========================== */

	#Your e-mail address
	define("__TO__", "marupezzati@gmail.com");

	#Message subject
	define("__SUBJECT__", "Nuevo Presupuesto");


	/* ========================  End Define variables ======================== */

	//Check e-mail validation
	function check_email($email){
		if(!@eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email)){
			return false;
		} else {
			return true;
		}
	}

	//Get post data
	if(isset($_POST['email'])){

		$name 	 = $_POST['name'];
		$mail 	 = $_POST['email'];
		$comments 	 = $_POST['coments'];

		//Send Mail
		$to = __TO__;
		$subject = __SUBJECT__ ;
		$message = '
		<html>
		<head>
		  <title>Nuevo presupuesto de '. $name .'</title>
		</head>
		<body>
		  <table class="table">
			<tr>
			  <th align="right">E-mail:</th>
			  <td align="left">'. $mail .'</td>
			</tr>
			<tr>
				<th align="right">Comentarios:</th>
				<td align="left">'. $comments .'</td>
			</tr>';

		foreach ($_POST as $key => $value) {
			$k = htmlspecialchars($key);
			$k = ucfirst(str_replace('-', ' ', $k));
			if($value !== '') {
				$message .=  '<tr><th align="right"> '.$k.' </th><td align="left"> '.htmlspecialchars($value).'</td></tr>';
			}
		}

		$message .= '</table></body></html>';

		$headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/plain; charset=utf-8\n";
    $headers .= "X-Priority: 3\n";
    $headers .= "X-MSMail-Priority: Normal\n";
    $headers .= "X-Mailer: php\n";
    $headers .= "From: \"Pedido presupuesto";

		mail($to,$subject,$message,$headers);
	}

	include 'confirma_contacto.html';
 ?>
