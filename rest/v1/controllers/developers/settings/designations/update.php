<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Designations($conn);

if (array_key_exists("id", $_GET)) {
    $val->designation_aid = $_GET['id'];
    $val->designation_name = trim($data['designation_name']);
    $val->designation_category = trim($data['designation_category']);
    $val->designation_updated = date("Y-m-d H:i:s");

    checkId($val->designation_aid);
    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Designation Update", $query);
}
checkEndpoint();