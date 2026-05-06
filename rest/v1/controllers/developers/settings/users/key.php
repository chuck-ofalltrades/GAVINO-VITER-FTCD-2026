<?php

// Turn on error reporting temporarily
ini_set('display_errors', 1);
error_reporting(E_ALL);

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/SystemUsers.php'; 

$conn = null;
$conn = checkDbConnection();
$val = new SystemUsers($conn); 

if(array_key_exists('key', $_GET)){
    $val->system_user_key = $_GET['key']; 
    $query = checkReadKey($val);
    
    http_response_code(200);
    getQueriedData($query);
} else {
    checkEndpoint();
}