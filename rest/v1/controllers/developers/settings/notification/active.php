<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/notification/Notification.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Notification($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->notification_aid = $_GET['id'];
    $val->notification_is_active = trim($data['isActive']);
    $val->notification_updated = date("Y-m-d H:i:s");

    checkId($val->notification_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'Notification Active', $query);
}

checkEndpoint();