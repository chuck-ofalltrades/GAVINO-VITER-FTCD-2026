<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/notification/Notification.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Notification($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (!$data) {
    $data = [];
}

$val->start = isset($_GET['start']) ? (int) $_GET['start'] : 1;
$val->total = 10;
$val->notification_is_active = isset($data['filterData']) ? $data['filterData'] : "";
$val->search = isset($data['searchValue']) ? trim($data['searchValue']) : "";

checkLimitId($val->start, $val->total);

$query = checkReadLimit($val);
$total_result = checkReadAll($val);

http_response_code(200);
checkReadQuery(
    $query,
    $total_result,
    $val->total,
    $val->start
);