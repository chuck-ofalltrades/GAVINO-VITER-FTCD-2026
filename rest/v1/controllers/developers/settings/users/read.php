<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);

// make use of classes for
$val = new Users($conn);

if (empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 if endpoint not found
checkEndpoint();