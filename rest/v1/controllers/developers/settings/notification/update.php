<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Notification($conn);

if (array_key_exists("id", $_GET)) {
    $val->notification_aid = $_GET['id'];
    $val->notification_first_name = trim($data['notification_first_name']);
    $val->notification_last_name = trim($data['notification_last_name']);
    $val->notification_email = trim($data['notification_email']);
    $val->notification_purpose = trim($data['notification_purpose']);
    $val->notification_updated = date("Y-m-d H:i:s");

    checkId($val->notification_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Notification Update", $query);
}

checkEndpoint();