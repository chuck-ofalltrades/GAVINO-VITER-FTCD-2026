<?php

require '../../../../core/header.php';
require '../../../../core/Encryption.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/SystemUsers.php';

$conn = null;
$conn = checkDbConnection();
$val = new SystemUsers($conn);
$encrypt = new Encryption();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

// Proceed directly since this is a public verification route
checkPayload($data);

$val->system_user_password = $encrypt->doPasswordHash($data['new_password']);
$val->system_user_key = $data['key'];
$val->system_user_updated = date("Y-m-d H:i:s");

$query = checkSetPassword($val);

http_response_code(200);
returnSuccess($val, "System User set password", $query);