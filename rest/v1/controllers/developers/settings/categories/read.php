<?php
require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/categories/Categories.php';

$conn = null;
$conn = checkDbConnection($conn);
$val = new Categories($conn); // Make sure 'Categories' matches your class name exactly
$query = checkReadAll($val);
http_response_code(200);
getQueriedData($query);