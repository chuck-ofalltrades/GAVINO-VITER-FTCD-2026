<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/donor/Donor.php';

$conn = null;
$conn = checkDbConnection($conn);
$val = new Donor($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->donor_aid = $_GET['id'];
    $val->donor_is_active = trim($data['isActive']);
    $val->donor_updated = date("Y-m-d H:i:s");

    checkId($val->donor_aid);
    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Donor Active", $query);
}
checkEndpoint();