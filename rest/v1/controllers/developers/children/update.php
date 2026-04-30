<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Children($conn);

if (array_key_exists("id", $_GET)) {
    $val->children_aid = $_GET['id'];
    $val->children_name = trim($data['children_name']);
    $val->children_birthdate = trim($data['children_birthdate']);
    $val->children_story = trim($data['children_story']);
    $val->children_donation_limit = trim($data['children_donation_limit']);
    $val->children_is_resident = isset($data['children_is_resident']) ? trim($data['children_is_resident']) : 0;
    $val->children_updated = date("Y-m-d H:i:s");

    checkId($val->children_aid);
    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Children Update", $query);
}
checkEndpoint();