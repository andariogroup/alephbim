<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos en formato JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $nombre = htmlspecialchars($data['nombre']);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $telefono = htmlspecialchars($data['telefono']);
        $pais = htmlspecialchars($data['pais']);
        $ciudad = htmlspecialchars($data['ciudad']);
        $servicio = htmlspecialchars($data['servicio']);
        $mensaje = htmlspecialchars($data['mensaje']);

        $to = "alephbim@gmail.com";
        $subject = "Nueva Solicitud de Cotizacion - " . $servicio;

        $body = "Has recibido una nueva solicitud de cotizacion.\n\n";
        $body .= "Detalles del contacto:\n";
        $body .= "Nombre / Empresa: $nombre\n";
        $body .= "Correo: $email\n";
        $body .= "Telefono: $telefono\n";
        $body .= "Pais: $pais\n";
        $body .= "Ciudad: $ciudad\n";
        $body .= "Servicio de interes: $servicio\n\n";
        $body .= "Detalles del Proyecto:\n$mensaje\n";

        // Headers para el correo
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Enviar el correo
        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Hubo un error al enviar el correo."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Datos invalidos."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Metodo no permitido."]);
}
?>
