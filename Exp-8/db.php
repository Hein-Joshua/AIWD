<?php
// db.php — Database Connection File

$host     = "localhost";  // MySQL server
$username = "root";       // MySQL username
$password = "";           // MySQL password (empty by default in XAMPP)
$database = "event_db";  // Database name

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check if connection failed
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>