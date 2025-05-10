<?php
class ContactsModel {
    private $db;

    public function __construct() {
        // Conectar a la base de datos SQLite
        $this->db = new SQLite3('../database/database.db');
        
        // Crear la tabla si no existe
        $this->db->exec("CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY,
            email TEXT,
            name TEXT,
            comment TEXT,
            ip TEXT,
            datetime TEXT
        )");
    }

    public function save($email, $name, $comment, $ip, $datetime) {
        // Insertar los datos en la base de datos
        $stmt = $this->db->prepare("INSERT INTO contacts (email, name, comment, ip, datetime) VALUES (?, ?, ?, ?, ?)");
        $stmt->bindValue(1, $email, SQLITE3_TEXT);
        $stmt->bindValue(2, $name, SQLITE3_TEXT);
        $stmt->bindValue(3, $comment, SQLITE3_TEXT);
        $stmt->bindValue(4, $ip, SQLITE3_TEXT);
        $stmt->bindValue(5, $datetime, SQLITE3_TEXT);