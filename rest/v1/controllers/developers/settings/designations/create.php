<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Designations($conn);

checkPayLoad($data);
$val->designation_is_active = 1;
$val->designation_name = trim($data['designation_name']);
$val->designation_category = trim($data['designation_category']);
$val->designation_created = date("Y-m-d H:i:s");
$val->designation_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Designation Create", $query);