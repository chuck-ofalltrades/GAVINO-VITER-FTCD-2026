<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Roles($conn);

if (array_key_exists("id", $_GET)) {
    $val->role_aid = $_GET['id'];
    $val->role_name = trim($data['role_name']);
    $val->role_description = trim($data['role_description']);
    $val->role_updated = date("Y-m-d H:i:s");

    checkId($val->role_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Role Update", $query);
}

checkEndpoint();