<?php
require_once '../database/ContactsModel.php';

class ContactsController {
    public function add() {
        $email = $_POST['email'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];
        $ip = $_SERVER['REMOTE_ADDR'];
        $datetime = date("Y-m-d H:i:s");

        $contactModel = new ContactsModel();
        $contactModel->save($email, $name, $comment, $ip, $datetime);

        echo "¡Tu contacto ha sido guardado!";
    }
}
?>