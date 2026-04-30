<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Children($conn);
if (array_key_exists("id", $_GET)) {
    $val->children_aid = $_GET['id'];
    checkId($val->children_aid);
    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Children Delete", $query);
}
checkEndpoint();