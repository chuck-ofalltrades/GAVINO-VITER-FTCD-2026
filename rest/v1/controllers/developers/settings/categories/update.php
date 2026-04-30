<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Categories($conn);

if (array_key_exists("id", $_GET)) {
    $val->category_aid = $_GET['id'];
    $val->category_name = trim($data['category_name']);
    $val->category_description = trim($data['category_description']);
    $val->category_updated = date("Y-m-d H:i:s");

    checkId($val->category_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Category Update", $query);
}

checkEndpoint();