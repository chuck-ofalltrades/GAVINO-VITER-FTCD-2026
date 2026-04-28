<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);

// make use of classes for
$val = new Employees($conn);

if (array_key_exists("id", $_GET)) {
    $val->employee_aid = $_GET['id'];
    $val->employee_first_name = trim($data['employee_first_name']);
    $val->employee_middle_name = trim($data['employee_middle_name']);
    $val->employee_last_name = trim($data['employee_last_name']);
    $val->employee_email = trim($data['employee_email']);
    $val->employee_department_id = trim($data['employee_department_id']);
    $val->employee_updated = date("Y-m-d H:i:s");

    // validation
    checkId($val->employee_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Employees Update", $query);
}

checkEndpoint();