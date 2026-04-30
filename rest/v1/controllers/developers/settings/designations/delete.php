<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Designations($conn);

if (array_key_exists("id", $_GET)) {
    $val->designation_aid = $_GET['id'];
    checkId($val->designation_aid);
    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Designation Delete", $query);
}
checkEndpoint();