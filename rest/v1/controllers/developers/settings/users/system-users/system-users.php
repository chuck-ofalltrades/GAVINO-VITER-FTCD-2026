<?php

require '../../../../../core/header.php';
require '../../../../../core/functions.php';
require '../../../../../models/developers/settings/users/SystemUsers.php';

$conn = null;
$conn = checkDbConnection($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    $val = new SystemUsers($conn);

    $query = checkReadAll($val);

    http_response_code(200);
    getQueriedData($query);
}

if ($method === "POST") {
    $val = new SystemUsers($conn);

    $val->system_user_is_active = 1;
    $val->system_user_first_name = trim($data["system_user_first_name"]);
    $val->system_user_last_name = trim($data["system_user_last_name"]);
    $val->system_user_email = trim($data["system_user_email"]);
    $val->system_user_role_id = trim($data["system_user_role_id"]);
    $val->system_user_created = date("Y-m-d H:i:s");
    $val->system_user_updated = date("Y-m-d H:i:s");

    $query = $val->checkEmail();
    if ($query->rowCount() > 0) {
        returnError("Email already exists.");
    }

    $query = checkCreate($val);

    http_response_code(200);
    returnSuccess($val, "System Users Create", $query);
}

if ($method === "PUT") {
    $val = new SystemUsers($conn);

    if (array_key_exists("id", $_GET)) {
        $val->system_user_aid = $_GET["id"];
        $val->system_user_first_name = trim($data["system_user_first_name"]);
        $val->system_user_last_name = trim($data["system_user_last_name"]);
        $val->system_user_email = trim($data["system_user_email"]);
        $val->system_user_role_id = trim($data["system_user_role_id"]);
        $val->system_user_updated = date("Y-m-d H:i:s");

        checkId($val->system_user_aid);

        $query = checkUpdate($val);

        http_response_code(200);
        returnSuccess($val, "System Users Update", $query);
    }
}

if ($method === "DELETE") {
    $val = new SystemUsers($conn);

    if (array_key_exists("id", $_GET)) {
        $val->system_user_aid = $_GET["id"];

        checkId($val->system_user_aid);

        $query = checkDelete($val);

        http_response_code(200);
        returnSuccess($val, "System Users Delete", $query);
    }
}

checkEndpoint();