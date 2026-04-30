<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/children/Children.php';

$conn = null;
$conn = checkDbConnection($conn);
$val = new Children($conn);
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->children_aid = $_GET['id'];
    $val->children_is_active = trim($data['isActive']);
    $val->children_updated = date("Y-m-d H:i:s");
    checkId($val->children_aid);
    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Children Active", $query);
}
checkEndpoint();