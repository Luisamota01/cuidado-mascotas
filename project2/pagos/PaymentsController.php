<?php
require_once '../database/PaymentModel.php';

class PaymentsController {
    public function pay() {
        $amount = $_POST['amount'];
        $method = $_POST['method'];
        $datetime = date("Y-m-d H:i:s");

        if ($amount <= 0) {
            echo "Monto inválido.";
            return;
        }

        $paymentModel = new PaymentModel();
        $paymentModel->save($amount, $method, $datetime);

        echo "Pago realizado con éxito.";
    }
}
?>