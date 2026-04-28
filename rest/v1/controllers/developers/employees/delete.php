<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes for 
$val = new Employees($conn);

if(array_key_exists("id", $_GET)){
    $val->employee_aid = $_GET['id'];

    // VALIDATION
    checkId($val->employee_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Employees Delete", $query);
}

checkEndpoint();