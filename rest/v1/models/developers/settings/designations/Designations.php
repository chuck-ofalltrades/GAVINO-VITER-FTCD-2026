<?php

class Designations {
    public $designation_aid;
    public $designation_is_active;
    public $designation_name;
    public $designation_category;
    public $designation_created;
    public $designation_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblDesignations;

    public function __construct($db){
        $this->connection = $db;
        $this->tblDesignations = "settings_designations"; 
    }

    public function create(){
        try {
            $sql = "insert into {$this->tblDesignations} ";
            $sql .= "( ";
            $sql .= "designation_is_active, ";
            $sql .= "designation_name, ";
            $sql .= "designation_category, ";
            $sql .= "designation_created, ";
            $sql .= "designation_updated ";
            $sql .= ") values ( ";
            $sql .= ":designation_is_active, ";
            $sql .= ":designation_name, ";
            $sql .= ":designation_category, ";
            $sql .= ":designation_created, ";
            $sql .= ":designation_updated ";
            $sql .= ") ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_name" => $this->designation_name,
                "designation_category" => $this->designation_category,
                "designation_created" => $this->designation_created,
                "designation_updated" => $this->designation_updated,
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
            $sql = "select * from {$this->tblDesignations} where true ";
            $sql .= $this->designation_is_active != "" ? "and designation_is_active = :designation_is_active " : "";

            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "designation_name like :designation_name " : "";
            $sql .= $this->search != "" ? "or designation_category like :designation_category " : "";
            $sql .= $this->search != "" ? ") " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->designation_is_active != "" ? [
                    "designation_is_active" => $this->designation_is_active
                ] : []),
                ...($this->search != "" ? [
                    "designation_name" => "%{$this->search}%",
                    "designation_category" => "%{$this->search}%"
                ] : []),
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function readLimit(){
        try {
            $sql = "select * from {$this->tblDesignations} where true ";
            $sql .= $this->designation_is_active != "" ? "and designation_is_active = :designation_is_active " : "";

            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "designation_name like :designation_name " : "";
            $sql .= $this->search != "" ? "or designation_category like :designation_category " : "";
            $sql .= $this->search != "" ? ") " : "";

            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);

            $query->bindValue(":start", $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);

            if($this->designation_is_active != ""){
                $query->bindValue(":designation_is_active", $this->designation_is_active);
            }

            if($this->search != ""){
                $query->bindValue(":designation_name", "%{$this->search}%");
                $query->bindValue(":designation_category", "%{$this->search}%");
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
            $sql = "update {$this->tblDesignations} set ";
            $sql .= "designation_name = :designation_name, ";
            $sql .= "designation_category = :designation_category, ";
            $sql .= "designation_updated = :designation_updated ";
            $sql .= "where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_name" => $this->designation_name,
                "designation_category" => $this->designation_category,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function active(){
        try {
            $sql = "update {$this->tblDesignations} set ";
            $sql .= "designation_is_active = :designation_is_active, ";
            $sql .= "designation_updated = :designation_updated ";
            $sql .= "where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function delete(){
        try {
            $sql = "delete from {$this->tblDesignations} where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_aid" => $this->designation_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }
}