<?php

// import notification using __DIR__ to fix pathing issues
require __DIR__ . '/../../../../../notifications/verify-account.php';

$val = new SystemUsers($conn); 
$encrypt = new Encryption(); 

checkPayLoad($data);

$val->system_user_is_active = 1;
$val->system_user_first_name = trim($data['system_user_first_name']);
$val->system_user_last_name = trim($data['system_user_last_name']);
$val->system_user_email = trim($data['system_user_email']);

// Explicitly blank for the database so it doesn't throw a NULL error
$val->system_user_password = ''; 
$val->system_user_key = $encrypt->doHash(rand()); // Generates the security key
$val->system_user_role_id = $data['system_user_role_id'];
$val->system_user_created = date("Y-m-d H:i:s");
$val->system_user_updated = date("Y-m-d H:i:s");

$password_link = "/create-password";

// Check if email already exists before saving
$query = $val->checkEmail();
if ($query->rowCount() > 0) {
    returnError("Email already exists.");
}

$emailSendCount = 0;
$query = checkCreate($val);

if($query->rowCount() > 0){
    // Wrap the mailer in a try-catch so local SMTP failures don't crash the API
    try {
        $sendEmail = sendEmail(
            $password_link,
            $val->system_user_first_name,
            $val->system_user_email,
            $val->system_user_key
        );
        if($sendEmail['mail_success']) $emailSendCount++;
    } catch (Exception $e) {
        error_log("Mail failed to send locally: " . $e->getMessage());
    }
}

http_response_code(200);
returnSuccess($val, "System User Create", $query, $emailSendCount);