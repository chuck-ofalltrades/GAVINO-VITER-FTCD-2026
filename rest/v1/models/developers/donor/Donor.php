<?php

class Donor {
    public $donor_aid;
    public $donor_is_active;
    public $donor_name;
    public $donor_email;
    public $donor_contact;
    public $donor_address;
    public $donor_city;
    public $donor_state;
    public $donor_country;
    public $donor_zip;
    public $donor_stripe_id;
    public $donor_created;
    public $donor_updated;

    public $start;
    public $total;
    public $search;
    public $connection;
    public $lastInsertedId;
    public $tblDonor;

    public function __construct($db){
        $this->connection = $db;
        $this->tblDonor = "donors"; 
    }

    public function create(){
        try {
            $sql = "insert into {$this->tblDonor} ";
            $sql .= "(donor_is_active, donor_name, donor_email, donor_contact, donor_address, donor_city, donor_state, donor_country, donor_zip, donor_created, donor_updated) ";
            $sql .= "values (:donor_is_active, :donor_name, :donor_email, :donor_contact, :donor_address, :donor_city, :donor_state, :donor_country, :donor_zip, :donor_created, :donor_updated)";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_name" => $this->donor_name,
                "donor_email" => $this->donor_email,
                "donor_contact" => $this->donor_contact,
                "donor_address" => $this->donor_address,
                "donor_city" => $this->donor_city,
                "donor_state" => $this->donor_state,
                "donor_country" => $this->donor_country,
                "donor_zip" => $this->donor_zip,
                "donor_created" => $this->donor_created,
                "donor_updated" => $this->donor_updated,
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
            $sql = "select * from {$this->tblDonor} where true ";
            $sql .= $this->donor_is_active != "" ? "and donor_is_active = :donor_is_active " : "";
            $sql .= $this->search != "" ? "and (donor_name like :search or donor_email like :search) " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->donor_is_active != "" ? ["donor_is_active" => $this->donor_is_active] : []),
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
            $sql = "select * from {$this->tblDonor} where true ";
            $sql .= $this->donor_is_active != "" ? "and donor_is_active = :donor_is_active " : "";
            $sql .= $this->search != "" ? "and (donor_name like :search or donor_email like :search) " : "";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);
            if($this->donor_is_active != "") $query->bindValue(":donor_is_active", $this->donor_is_active);
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
            $sql = "update {$this->tblDonor} set ";
            $sql .= "donor_is_active = :donor_is_active, ";
            $sql .= "donor_name = :donor_name, ";
            $sql .= "donor_email = :donor_email, ";
            $sql .= "donor_contact = :donor_contact, ";
            $sql .= "donor_address = :donor_address, ";
            $sql .= "donor_city = :donor_city, ";
            $sql .= "donor_state = :donor_state, ";
            $sql .= "donor_country = :donor_country, ";
            $sql .= "donor_zip = :donor_zip, ";
            $sql .= "donor_updated = :donor_updated ";
            $sql .= "where donor_aid = :donor_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_name" => $this->donor_name,
                "donor_email" => $this->donor_email,
                "donor_contact" => $this->donor_contact,
                "donor_address" => $this->donor_address,
                "donor_city" => $this->donor_city,
                "donor_state" => $this->donor_state,
                "donor_country" => $this->donor_country,
                "donor_zip" => $this->donor_zip,
                "donor_updated" => $this->donor_updated,
                "donor_aid" => $this->donor_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active(){
        try {
            $sql = "update {$this->tblDonor} set ";
            $sql .= "donor_is_active = :donor_is_active, ";
            $sql .= "donor_updated = :donor_updated ";
            $sql .= "where donor_aid = :donor_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_updated" => $this->donor_updated,
                "donor_aid" => $this->donor_aid,
            ]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function delete(){
        try {
            $sql = "delete from {$this->tblDonor} where donor_aid = :donor_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute(["donor_aid" => $this->donor_aid]);
        } catch(PDOException $e){
            returnError($e);
            $query = false;
        }
        return $query;
    }
}