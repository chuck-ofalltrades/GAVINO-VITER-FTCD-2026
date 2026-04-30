<?php

class Notification {
    public $notification_aid;
    public $notification_is_active;
    public $notification_name;
    public $notification_email;
    public $notification_phone;
    public $notification_purpose;
    public $notification_created;
    public $notification_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblNotification;

    public function __construct($db){
        $this->connection = $db;
        $this->tblNotification = "settings_notifications"; 
    }

    public function create(){
        try {
            $sql = "insert into {$this->tblNotification} ";
            $sql .= "(notification_is_active, notification_name, notification_email, notification_phone, notification_purpose, notification_created, notification_updated) ";
            $sql .= "values (:notification_is_active, :notification_name, :notification_email, :notification_phone, :notification_purpose, :notification_created, :notification_updated)";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_created" => $this->notification_created,
                "notification_updated" => $this->notification_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function readAll(){
        try {
            $sql = "select * from {$this->tblNotification} where true ";
            $sql .= $this->notification_is_active != "" ? "and notification_is_active = :notification_is_active " : "";
            $sql .= $this->search != "" ? "and (notification_name like :search or notification_email like :search or notification_purpose like :search) " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->notification_is_active != "" ? ["notification_is_active" => $this->notification_is_active] : []),
                ...($this->search != "" ? ["search" => "%{$this->search}%"] : []),
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function readLimit(){
        try {
            $sql = "select * from {$this->tblNotification} where true ";
            $sql .= $this->notification_is_active != "" ? "and notification_is_active = :notification_is_active " : "";
            $sql .= $this->search != "" ? "and (notification_name like :search or notification_email like :search or notification_purpose like :search) " : "";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);
            
            if($this->notification_is_active != "") $query->bindValue(":notification_is_active", $this->notification_is_active);
            if($this->search != ""){
                $query->bindValue(":search", "%{$this->search}%");
            }
            $query->execute();
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function update(){
        try {
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_name = :notification_name, ";
            $sql .= "notification_email = :notification_email, ";
            $sql .= "notification_phone = :notification_phone, ";
            $sql .= "notification_purpose = :notification_purpose, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active(){
        try {
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function delete(){
        try {
            $sql = "delete from {$this->tblNotification} where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute(["notification_aid" => $this->notification_aid]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }
}