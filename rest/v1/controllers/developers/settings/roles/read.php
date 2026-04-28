<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Roles($conn);

if (empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();