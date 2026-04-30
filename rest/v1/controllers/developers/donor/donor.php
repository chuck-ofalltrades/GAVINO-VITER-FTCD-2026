<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/donor/Donor.php';

$conn = null;
$conn = checkDbConnection($conn);
$donor = new Donor($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        require 'create.php';
        break;
    case 'GET':
        require 'read.php';
        break;
    case 'PUT':
        require 'update.php';
        break;
    case 'DELETE':
        require 'delete.php';
        break;
    default:
        checkEndpoint();
}