<?php

class Categories {
    public $category_aid;
    public $category_is_active;
    public $category_name;
    public $category_description;
    public $category_created;
    public $category_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblCategories;

    public function __construct($db){
        $this->connection = $db;
        $this->tblCategories = "settings_categories"; 
    }

    public function create(){
        try {
            $sql = "insert into {$this->tblCategories} ";
            $sql .= "( ";
            $sql .= "category_is_active, ";
            $sql .= "category_name, ";
            $sql .= "category_description, ";
            $sql .= "category_created, ";
            $sql .= "category_updated ";
            $sql .= ") values ( ";
            $sql .= ":category_is_active, ";
            $sql .= ":category_name, ";
            $sql .= ":category_description, ";
            $sql .= ":category_created, ";
            $sql .= ":category_updated ";
            $sql .= ") ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_created" => $this->category_created,
                "category_updated" => $this->category_updated,
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
            $sql = "select * from {$this->tblCategories} where true ";
            $sql .= $this->category_is_active != "" ? "and category_is_active = :category_is_active " : "";

            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "category_name like :category_name " : "";
            $sql .= $this->search != "" ? "or category_description like :category_description " : "";
            $sql .= $this->search != "" ? ") " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->category_is_active != "" ? [
                    "category_is_active" => $this->category_is_active
                ] : []),
                ...($this->search != "" ? [
                    "category_name" => "%{$this->search}%",
                    "category_description" => "%{$this->search}%"
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
            $sql = "select * from {$this->tblCategories} where true ";
            $sql .= $this->category_is_active != "" ? "and category_is_active = :category_is_active " : "";

            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "category_name like :category_name " : "";
            $sql .= $this->search != "" ? "or category_description like :category_description " : "";
            $sql .= $this->search != "" ? ") " : "";

            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);

            $query->bindValue(":start", $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);

            if($this->category_is_active != ""){
                $query->bindValue(":category_is_active", $this->category_is_active);
            }

            if($this->search != ""){
                $query->bindValue(":category_name", "%{$this->search}%");
                $query->bindValue(":category_description", "%{$this->search}%");
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
            $sql = "update {$this->tblCategories} set ";
            $sql .= "category_name = :category_name, ";
            $sql .= "category_description = :category_description, ";
            $sql .= "category_updated = :category_updated ";
            $sql .= "where category_aid = :category_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function active(){
        try {
            $sql = "update {$this->tblCategories} set ";
            $sql .= "category_is_active = :category_is_active, ";
            $sql .= "category_updated = :category_updated ";
            $sql .= "where category_aid = :category_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function delete(){
        try {
            $sql = "delete from {$this->tblCategories} where category_aid = :category_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
            ]);

        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }

        return $query;
    }
}