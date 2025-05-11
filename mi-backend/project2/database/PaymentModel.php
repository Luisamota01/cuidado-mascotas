<?php
class PaymentModel {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('../database/database.db');
        $this->db->exec("CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY,
            amount REAL,
            method TEXT,
            datetime TEXT
        )");
    }

    public function save($amount, $method, $datetime) {
        $stmt = $this->db->prepare("INSERT INTO payments (amount, method, datetime) VALUES (?, ?, ?)");
        $stmt->bindValue(1, $amount, SQLITE3_FLOAT);
        $stmt->bindValue(2, $method, SQLITE3_TEXT);
        $stmt->bindValue(3, $datetime, SQLITE3_TEXT);
        $stmt->execute();
    }
}
?>