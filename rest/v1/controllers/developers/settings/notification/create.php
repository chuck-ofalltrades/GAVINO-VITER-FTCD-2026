<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Notification($conn);

checkPayLoad($data);

$val->notification_is_active = 1;
$val->notification_first_name = trim($data['notification_first_name']);
$val->notification_last_name = trim($data['notification_last_name']);
$val->notification_email = trim($data['notification_email']);
$val->notification_purpose = trim($data['notification_purpose']);
$val->notification_created = date("Y-m-d H:i:s");
$val->notification_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Notification Create", $query);