<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/categories/Categories.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Categories($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);

    $val->category_aid = $_GET['id'];
    $val->category_is_active = trim($data['isActive']);
    $val->category_updated = date("Y-m-d H:i:s");

    checkId($val->category_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Category Active", $query);
}

checkEndpoint();