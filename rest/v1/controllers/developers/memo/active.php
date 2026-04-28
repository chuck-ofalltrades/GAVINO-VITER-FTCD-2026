<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/memo/Memo.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Memo($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->memo_aid = $_GET['id'];
    $val->memo_is_active = trim($data['isActive']);
    $val->memo_updated = date("Y-m-d H:i:s");

    checkId($val->memo_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'Memo Active', $query);
}

checkEndpoint();