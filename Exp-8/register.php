<?php
// register.php — Receives form data and saves it to MySQL

include 'db.php'; // Connect to database

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Step 1: Collect and sanitize each form field
    $fname      = mysqli_real_escape_string($conn, $_POST['fname']);
    $email      = mysqli_real_escape_string($conn, $_POST['email']);
    $event_date = mysqli_real_escape_string($conn, $_POST['event-date']);
    $tickets    = (int) $_POST['tickets'];
    $tshirt     = mysqli_real_escape_string($conn, $_POST['tshirt']);
    $experience = (int) $_POST['experience'];
    $mode       = mysqli_real_escape_string($conn, $_POST['mode']);
    $comments   = mysqli_real_escape_string($conn, $_POST['comments']);

    // Step 2: Write the INSERT query
    $sql = "INSERT INTO registrations 
                (full_name, email, event_date, tickets, tshirt_size, skill_level, mode, comments)
            VALUES 
                ('$fname', '$email', '$event_date', $tickets, '$tshirt', $experience, '$mode', '$comments')";

    // Step 3: Execute the query and show result
    if (mysqli_query($conn, $sql)) {
        // SUCCESS — show confirmation page
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <title>Registration Success</title>
            <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>
        </head>
        <body class='bg-light d-flex justify-content-center align-items-center' style='height:100vh;'>
            <div class='card p-5 text-center shadow' style='max-width:500px;'>
                <h2 class='text-success'>✅ Registration Successful!</h2>
                <p class='mt-3'>Thank you, <strong>$fname</strong>!</p>
                <p>Your registration for <strong>TechNexus 2026</strong> has been saved.</p>
                <p>Confirmation will be sent to <strong>$email</strong>.</p>
                <a href='event.html' class='btn btn-primary mt-3'>Go Back to Portal</a>
            </div>
        </body>
        </html>";
    } else {
        // ERROR — show the MySQL error
        echo "<p style='color:red;'>Error: " . mysqli_error($conn) . "</p>";
    }

    // Step 4: Close the connection
    mysqli_close($conn);

} else {
    // If someone opens register.php directly without submitting
    header("Location: event.html");
}
?>