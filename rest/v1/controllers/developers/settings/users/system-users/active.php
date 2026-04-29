<?php

require '../../../../../core/header.php';
require '../../../../../core/functions.php';
require '../../../../../models/developers/settings/users/SystemUsers.php';

$conn = null;
$conn = checkDbConnection($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "PUT") {
    $val = new SystemUsers($conn);

    if (array_key_exists("id", $_GET)) {
        $val->system_user_aid = $_GET["id"];
        $val->system_user_is_active = trim($data["isActive"]);
        $val->system_user_updated = date("Y-m-d H:i:s");

        checkId($val->system_user_aid);

        $query = checkActive($val);

        http_response_code(200);
        returnSuccess($val, "System Users Active", $query);
    }
}

checkEndpoint();