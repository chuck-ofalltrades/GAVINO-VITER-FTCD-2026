<?php

class SystemUsers
{
    public $system_user_aid;
    public $system_user_is_active;
    public $system_user_first_name;
    public $system_user_last_name;
    public $system_user_email;
    public $system_user_role_id;
    public $system_user_password; 
    public $system_user_key; 
    public $system_user_created;
    public $system_user_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblSystemUsers;
    public $tblRoles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSystemUsers = "settings_system_users";
        $this->tblRoles = "settings_roles";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSystemUsers} ";
            $sql .= "( ";
            $sql .= "system_user_is_active, ";
            $sql .= "system_user_first_name, ";
            $sql .= "system_user_last_name, ";
            $sql .= "system_user_email, ";
            $sql .= "system_user_role_id, ";
            $sql .= "system_user_password, "; 
            $sql .= "system_user_key, "; 
            $sql .= "system_user_created, ";
            $sql .= "system_user_updated ";
            $sql .= ") values ( ";
            $sql .= ":system_user_is_active, ";
            $sql .= ":system_user_first_name, ";
            $sql .= ":system_user_last_name, ";
            $sql .= ":system_user_email, ";
            $sql .= ":system_user_role_id, ";
            $sql .= ":system_user_password, "; 
            $sql .= ":system_user_key, "; 
            $sql .= ":system_user_created, ";
            $sql .= ":system_user_updated ";
            $sql .= ") ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_is_active" => $this->system_user_is_active,
                "system_user_first_name" => $this->system_user_first_name,
                "system_user_last_name" => $this->system_user_last_name,
                "system_user_email" => $this->system_user_email,
                "system_user_role_id" => $this->system_user_role_id,
                "system_user_password" => $this->system_user_password, 
                "system_user_key" => $this->system_user_key, 
                "system_user_created" => $this->system_user_created,
                "system_user_updated" => $this->system_user_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "su.*, ";
            $sql .= "r.role_name ";
            $sql .= "from {$this->tblSystemUsers} as su ";
            $sql .= "left join {$this->tblRoles} as r ";
            $sql .= "on su.system_user_role_id = r.role_aid ";
            $sql .= "where true ";
            $sql .= $this->system_user_is_active != "" ? "and su.system_user_is_active = :system_user_is_active " : "";
            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "su.system_user_first_name like :system_user_first_name " : "";
            $sql .= $this->search != "" ? "or su.system_user_last_name like :system_user_last_name " : "";
            $sql .= $this->search != "" ? "or su.system_user_email like :system_user_email " : "";
            $sql .= $this->search != "" ? "or r.role_name like :role_name " : "";
            $sql .= $this->search != "" ? ") " : "";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->system_user_is_active != "" ? [
                    "system_user_is_active" => $this->system_user_is_active,
                ] : []),
                ...($this->search != "" ? [
                    "system_user_first_name" => "%{$this->search}%",
                    "system_user_last_name" => "%{$this->search}%",
                    "system_user_email" => "%{$this->search}%",
                    "role_name" => "%{$this->search}%",
                ] : []),
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "su.*, ";
            $sql .= "r.role_name ";
            $sql .= "from {$this->tblSystemUsers} as su ";
            $sql .= "left join {$this->tblRoles} as r ";
            $sql .= "on su.system_user_role_id = r.role_aid ";
            $sql .= "where true ";
            $sql .= $this->system_user_is_active != "" ? "and su.system_user_is_active = :system_user_is_active " : "";
            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "su.system_user_first_name like :system_user_first_name " : "";
            $sql .= $this->search != "" ? "or su.system_user_last_name like :system_user_last_name " : "";
            $sql .= $this->search != "" ? "or su.system_user_email like :system_user_email " : "";
            $sql .= $this->search != "" ? "or r.role_name like :role_name " : "";
            $sql .= $this->search != "" ? ") " : "";
            $sql .= "order by su.system_user_aid desc ";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->start - 1,
                "total" => $this->total,
                ...($this->system_user_is_active != "" ? [
                    "system_user_is_active" => $this->system_user_is_active,
                ] : []),
                ...($this->search != "" ? [
                    "system_user_first_name" => "%{$this->search}%",
                    "system_user_last_name" => "%{$this->search}%",
                    "system_user_email" => "%{$this->search}%",
                    "role_name" => "%{$this->search}%",
                ] : []),
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSystemUsers} set ";
            $sql .= "system_user_first_name = :system_user_first_name, ";
            $sql .= "system_user_last_name = :system_user_last_name, ";
            $sql .= "system_user_email = :system_user_email, ";
            $sql .= "system_user_role_id = :system_user_role_id, ";
            $sql .= "system_user_updated = :system_user_updated ";
            $sql .= "where system_user_aid = :system_user_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_first_name" => $this->system_user_first_name,
                "system_user_last_name" => $this->system_user_last_name,
                "system_user_email" => $this->system_user_email,
                "system_user_role_id" => $this->system_user_role_id,
                "system_user_updated" => $this->system_user_updated,
                "system_user_aid" => $this->system_user_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblSystemUsers} set ";
            $sql .= "system_user_is_active = :system_user_is_active, ";
            $sql .= "system_user_updated = :system_user_updated ";
            $sql .= "where system_user_aid = :system_user_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_is_active" => $this->system_user_is_active,
                "system_user_updated" => $this->system_user_updated,
                "system_user_aid" => $this->system_user_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSystemUsers} ";
            $sql .= "where system_user_aid = :system_user_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_aid" => $this->system_user_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function checkEmail()
    {
        try {
            $sql = "select system_user_email ";
            $sql .= "from {$this->tblSystemUsers} ";
            $sql .= "where system_user_email = :system_user_email ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_email" => $this->system_user_email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // --- ADDED METHODS BELOW ---

    // Read user by their unique URL key
    public function readKey()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblSystemUsers} ";
            $sql .= "where system_user_key = :system_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_key" => $this->system_user_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Set the new password and update the timestamp
    public function setPassword()
    {
        try {
            $sql = "update {$this->tblSystemUsers} set ";
            $sql .= "system_user_password = :system_user_password, ";
            $sql .= "system_user_updated = :system_user_updated ";
            $sql .= "where system_user_key = :system_user_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_user_password" => $this->system_user_password,
                "system_user_updated" => $this->system_user_updated,
                "system_user_key" => $this->system_user_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}