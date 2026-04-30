<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Children($conn);
checkPayLoad($data);

$val->children_is_active = 1;
$val->children_name = isset($data['children_name']) ? trim($data['children_name']) : "";

// Force any date string (like 04/30/2004) into MySQL's required YYYY-MM-DD format!
$raw_date = isset($data['children_birthdate']) ? trim($data['children_birthdate']) : "";
$val->children_birthdate = !empty($raw_date) ? date("Y-m-d", strtotime($raw_date)) : "";

$val->children_story = isset($data['children_story']) ? trim($data['children_story']) : "";
$val->children_donation_limit = isset($data['children_donation_limit']) ? trim($data['children_donation_limit']) : 0;
$val->children_is_resident = isset($data['children_is_resident']) ? trim($data['children_is_resident']) : 0;
$val->children_created = date("Y-m-d H:i:s");
$val->children_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Children Create", $query);