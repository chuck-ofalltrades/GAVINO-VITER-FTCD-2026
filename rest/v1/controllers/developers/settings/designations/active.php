<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/designations/Designations.php';

$conn = null;
$conn = checkDbConnection($conn);
$val = new Designations($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->designation_aid = $_GET['id'];
    $val->designation_is_active = trim($data['isActive']);
    $val->designation_updated = date("Y-m-d H:i:s");

    checkId($val->designation_aid);
    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Designation Active", $query);
}
checkEndpoint();