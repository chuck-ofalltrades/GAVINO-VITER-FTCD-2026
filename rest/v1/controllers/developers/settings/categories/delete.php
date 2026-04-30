<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Categories($conn);

if (array_key_exists("id", $_GET)) {
    $val->category_aid = $_GET['id'];

    checkId($val->category_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Category Delete", $query);
}

checkEndpoint();