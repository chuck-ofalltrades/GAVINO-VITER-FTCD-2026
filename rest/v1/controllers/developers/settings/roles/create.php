<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Roles($conn);

checkPayLoad($data);

$val->role_is_active = 1;
$val->role_name = trim($data['role_name']);
$val->role_code = trim($data['role_code']); // ADDED: captures the role code
$val->role_description = trim($data['role_description']);
$val->role_created = date("Y-m-d H:i:s");
$val->role_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Role Create", $query);