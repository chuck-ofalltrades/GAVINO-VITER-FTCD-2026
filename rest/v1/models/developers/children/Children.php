<?php

class Children {
    public $children_aid;
    public $children_is_active;
    public $children_name;
    public $children_birthdate;
    public $children_story;
    public $children_donation_limit;
    public $children_is_resident;
    public $children_created;
    public $children_updated;

    public $start;
    public $total;
    public $search;
    public $connection;
    public $lastInsertedId;
    public $tblChildren;

    public function __construct($db){
        $this->connection = $db;
        $this->tblChildren = "children"; 
    }

    public function create(){
        try {
            $sql = "insert into {$this->tblChildren} ";
            $sql .= "(children_is_active, children_name, children_birthdate, children_story, children_donation_limit, children_is_resident, children_created, children_updated) ";
            $sql .= "values (:children_is_active, :children_name, :children_birthdate, :children_story, :children_donation_limit, :children_is_resident, :children_created, :children_updated)";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_is_active" => $this->children_is_active,
                "children_name" => $this->children_name,
                "children_birthdate" => $this->children_birthdate,
                "children_story" => $this->children_story,
                "children_donation_limit" => $this->children_donation_limit,
                "children_is_resident" => $this->children_is_resident,
                "children_created" => $this->children_created,
                "children_updated" => $this->children_updated,
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
            $sql = "select * from {$this->tblChildren} where true ";
            $sql .= $this->children_is_active != "" ? "and children_is_active = :children_is_active " : "";
            $sql .= $this->search != "" ? "and children_name like :search " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->children_is_active != "" ? ["children_is_active" => $this->children_is_active] : []),
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
            $sql = "select * from {$this->tblChildren} where true ";
            $sql .= $this->children_is_active != "" ? "and children_is_active = :children_is_active " : "";
            $sql .= $this->search != "" ? "and children_name like :search " : "";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);
            if($this->children_is_active != "") $query->bindValue(":children_is_active", $this->children_is_active);
            if($this->search != "") $query->bindValue(":search", "%{$this->search}%");
            $query->execute();
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function update(){
        try {
            $sql = "update {$this->tblChildren} set ";
            $sql .= "children_name = :children_name, ";
            $sql .= "children_birthdate = :children_birthdate, ";
            $sql .= "children_story = :children_story, ";
            $sql .= "children_donation_limit = :children_donation_limit, ";
            $sql .= "children_is_resident = :children_is_resident, ";
            $sql .= "children_updated = :children_updated ";
            $sql .= "where children_aid = :children_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_name" => $this->children_name,
                "children_birthdate" => $this->children_birthdate,
                "children_story" => $this->children_story,
                "children_donation_limit" => $this->children_donation_limit,
                "children_is_resident" => $this->children_is_resident,
                "children_updated" => $this->children_updated,
                "children_aid" => $this->children_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active(){
        try {
            $sql = "update {$this->tblChildren} set ";
            $sql .= "children_is_active = :children_is_active, ";
            $sql .= "children_updated = :children_updated ";
            $sql .= "where children_aid = :children_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_is_active" => $this->children_is_active,
                "children_updated" => $this->children_updated,
                "children_aid" => $this->children_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function delete(){
        try {
            $sql = "delete from {$this->tblChildren} where children_aid = :children_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute(["children_aid" => $this->children_aid]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }
}