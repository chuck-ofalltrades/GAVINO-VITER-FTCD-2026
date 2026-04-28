<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use models
require '../../../models/developers/employees/Employees.php';

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// create or post
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $result = require 'create.php';
   sendResponse($result);
   exit;
}

// READ / GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   if(array_key_exists('start', $_GET)){
      $result = require 'page.php';
   } else {
      $result = require 'read.php';
   }
   sendResponse($result);
   exit;
}

// UPDATE / PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
   $result = require 'update.php';
   sendResponse($result);
   exit;
}

// DELETE / DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   $result = require 'delete.php';
   sendResponse($result);
   exit;
}