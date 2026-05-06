<?php

// 1. ADDED ONE MORE '../' BECAUSE OF THE 'system-users' FOLDER
require __DIR__ . '/../../../../../notifications/verify-account.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new SystemUsers($conn); // 2. UPDATED TO FTCD MODEL
$encrypt = new Encryption();

$val->system_user_is_active = 1;
// 3. UPDATED TO FTCD VARIABLES
$val->system_user_first_name = trim($data['system_user_first_name']);
$val->system_user_last_name = trim($data['system_user_last_name']);
$val->system_user_email = trim($data['system_user_email']);
$val->system_user_password = '';
$val->system_user_key = $encrypt->doHash(rand());
$val->system_user_role_id = $data['system_user_role_id'];
$val->system_user_created = date("Y-m-d H:i:s");
$val->system_user_updated = date("Y-m-d H:i:s");
$password_link = "/create-password";

// VALIDATIONS
// isNameExist($val, $val->system_user_first_name);

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
        // Gracefully handle local mailer errors without returning a 500 error
        error_log("Mail failed to send locally: " . $e->getMessage());
    }
}

http_response_code(200);
returnSuccess($val, "System Users Create", $query, $emailSendCount);