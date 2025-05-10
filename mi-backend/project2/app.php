<?php
// Activar errores (para depuración)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir modelos
require_once 'database/ContactsModel.php';
require_once 'database/PaymentModel.php';

// Manejo de solicitudes
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["email"])) {
        require_once 'contacto/ContactsController.php';
        $controller = new ContactsController();
        $controller->add();
    } elseif (isset($_POST["amount"])) {
        require_once 'pagos/PaymentsController.php';
        $controller = new PaymentsController();
        $controller->pay();
    }
}
?>