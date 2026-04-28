<?php

class Employees {
    public $employee_aid;
    public $employee_is_active;
    public $employee_first_name;
    public $employee_middle_name;
    public $employee_last_name;
    public $employee_email;
    public $employee_created;
    public $employee_updated;
    public $employee_department_id;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblEmployees;
    public $tblSettingsDepartment;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblEmployees = "employees";
        $this->tblSettingsDepartment = "settings_department";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblEmployees} ";
            $sql .= "( ";
            $sql .= "employee_is_active, ";
            $sql .= "employee_first_name, ";
            $sql .= "employee_middle_name, ";
            $sql .= "employee_last_name, ";
            $sql .= "employee_email, ";
            $sql .= "employee_department_id, ";
            $sql .= "employee_created, ";
            $sql .= "employee_updated ";
            $sql .= ") values ( ";
            $sql .= ":employee_is_active, ";
            $sql .= ":employee_first_name, ";
            $sql .= ":employee_middle_name, ";
            $sql .= ":employee_last_name, ";
            $sql .= ":employee_email, ";
            $sql .= ":employee_department_id, ";
            $sql .= ":employee_created, ";
            $sql .= ":employee_updated ";
            $sql .= ") ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_is_active" => $this->employee_is_active,
                "employee_first_name" => $this->employee_first_name,
                "employee_middle_name" => $this->employee_middle_name,
                "employee_last_name" => $this->employee_last_name,
                "employee_email" => $this->employee_email,
                "employee_department_id" => $this->employee_department_id,
                "employee_created" => $this->employee_created,
                "employee_updated" => $this->employee_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function readAll() {
        try {
            $sql = "select ";
            $sql .= "employee.*, department.department_name ";
            $sql .= "from {$this->tblEmployees} as employee, {$this->tblSettingsDepartment} as department ";
            $sql .= "where employee.employee_department_id = department.department_aid ";
            $sql .= $this->employee_is_active != "" ? "and employee.employee_is_active = :employee_is_active " : "";
            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "employee.employee_first_name like :employee_first_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_middle_name like :employee_middle_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_last_name like :employee_last_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_email like :employee_email " : "";
            $sql .= $this->search != "" ? "or department.department_name like :department_name " : "";
            $sql .= $this->search != "" ? ") " : "";
            $sql .= "order by employee.employee_aid desc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...($this->employee_is_active != "" ? [
                    "employee_is_active" => $this->employee_is_active
                ] : []),
                ...($this->search != "" ? [
                    "employee_first_name" => "%{$this->search}%",
                    "employee_middle_name" => "%{$this->search}%",
                    "employee_last_name" => "%{$this->search}%",
                    "employee_email" => "%{$this->search}%",
                    "department_name" => "%{$this->search}%",
                ] : []),
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function readLimit() {
        try {
            $sql = "select ";
            $sql .= "employee.*, department.department_name ";
            $sql .= "from {$this->tblEmployees} as employee, {$this->tblSettingsDepartment} as department ";
            $sql .= "where employee.employee_department_id = department.department_aid ";
            $sql .= $this->employee_is_active != "" ? "and employee.employee_is_active = :employee_is_active " : "";
            $sql .= $this->search != "" ? "and ( " : "";
            $sql .= $this->search != "" ? "employee.employee_first_name like :employee_first_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_middle_name like :employee_middle_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_last_name like :employee_last_name " : "";
            $sql .= $this->search != "" ? "or employee.employee_email like :employee_email " : "";
            $sql .= $this->search != "" ? "or department.department_name like :department_name " : "";
            $sql .= $this->search != "" ? ") " : "";
            $sql .= "order by employee.employee_aid desc ";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);

            if ($this->employee_is_active != "") {
                $query->bindValue(":employee_is_active", (int)$this->employee_is_active, PDO::PARAM_INT);
            }

            if ($this->search != "") {
                $query->bindValue(":employee_first_name", "%{$this->search}%", PDO::PARAM_STR);
                $query->bindValue(":employee_middle_name", "%{$this->search}%", PDO::PARAM_STR);
                $query->bindValue(":employee_last_name", "%{$this->search}%", PDO::PARAM_STR);
                $query->bindValue(":employee_email", "%{$this->search}%", PDO::PARAM_STR);
                $query->bindValue(":department_name", "%{$this->search}%", PDO::PARAM_STR);
            }

            $query->bindValue(":start", (int)($this->start - 1), PDO::PARAM_INT);
            $query->bindValue(":total", (int)$this->total, PDO::PARAM_INT);

            $query->execute();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function update() {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employee_first_name = :employee_first_name, ";
            $sql .= "employee_middle_name = :employee_middle_name, ";
            $sql .= "employee_last_name = :employee_last_name, ";
            $sql .= "employee_email = :employee_email, ";
            $sql .= "employee_department_id = :employee_department_id, ";
            $sql .= "employee_updated = :employee_updated ";
            $sql .= "where employee_aid = :employee_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_first_name" => $this->employee_first_name,
                "employee_middle_name" => $this->employee_middle_name,
                "employee_last_name" => $this->employee_last_name,
                "employee_email" => $this->employee_email,
                "employee_department_id" => $this->employee_department_id,
                "employee_updated" => $this->employee_updated,
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active() {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employee_is_active = :employee_is_active, ";
            $sql .= "employee_updated = :employee_updated ";
            $sql .= "where employee_aid = :employee_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_is_active" => $this->employee_is_active,
                "employee_updated" => $this->employee_updated,
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try {
            $sql = "delete from {$this->tblEmployees} ";
            $sql .= "where employee_aid = :employee_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function checkEmail() {
        try {
            $sql = "select employee_email ";
            $sql .= "from {$this->tblEmployees} ";
            $sql .= "where employee_email = :employee_email ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_email" => $this->employee_email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}