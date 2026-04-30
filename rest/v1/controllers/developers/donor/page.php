<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/donor/Donor.php';

$conn = null;
$conn = checkDbConnection($conn);
$val = new Donor($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (!$data) { $data = []; }

$val->start = isset($_GET['start']) ? (int) $_GET['start'] : 1;
$val->total = 10;
$val->donor_is_active = isset($data['filterData']) ? $data['filterData'] : "";
$val->search = isset($data['searchValue']) ? trim($data['searchValue']) : "";

checkLimitId($val->start, $val->total);
$query = checkReadLimit($val);
$total_result = checkReadAll($val);

http_response_code(200);
checkReadQuery($query, $total_result, $val->total, $val->start);