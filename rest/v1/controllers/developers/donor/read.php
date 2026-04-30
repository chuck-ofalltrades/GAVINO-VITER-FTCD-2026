<?php
$conn = null;
$conn = checkDbConnection($conn);
$val = new Donor($conn);

$query = checkReadAll($val);
http_response_code(200);
getQueriedData($query);