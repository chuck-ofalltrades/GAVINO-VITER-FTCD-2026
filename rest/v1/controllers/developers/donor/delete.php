<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Donor($conn);

if (array_key_exists("id", $_GET)) {
    $val->donor_aid = $_GET['id'];
    checkId($val->donor_aid);
    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Donor Delete", $query);
}
checkEndpoint();