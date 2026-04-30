<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Donor($conn);

if (array_key_exists("id", $_GET)) {
    $val->donor_aid = $_GET['id'];
    $val->donor_is_active = isset($data['donor_is_active']) ? trim($data['donor_is_active']) : 1;
    $val->donor_name = trim($data['donor_name']);
    $val->donor_email = trim($data['donor_email']);
    $val->donor_contact = trim($data['donor_contact']);
    $val->donor_address = trim($data['donor_address']);
    $val->donor_city = trim($data['donor_city']);
    $val->donor_state = trim($data['donor_state']);
    $val->donor_country = trim($data['donor_country']);
    $val->donor_zip = trim($data['donor_zip']);
    $val->donor_updated = date("Y-m-d H:i:s");

    checkId($val->donor_aid);
    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Donor Update", $query);
}
checkEndpoint();