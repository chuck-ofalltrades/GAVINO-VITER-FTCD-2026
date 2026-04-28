<?php

class Memo {
    public $memo_aid;
    public $memo_is_active;
    public $memo_from;
    public $memo_to;
    public $memo_date;
    public $memo_category;
    public $memo_text;
    public $memo_created;
    public $memo_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblMemo;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblMemo = "memo";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblMemo} (
                memo_is_active,
                memo_from,
                memo_to,
                memo_date,
                memo_category,
                memo_text,
                memo_created,
                memo_updated
            ) values (
                :memo_is_active,
                :memo_from,
                :memo_to,
                :memo_date,
                :memo_category,
                :memo_text,
                :memo_created,
                :memo_updated
            )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_is_active" => $this->memo_is_active,
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_created" => $this->memo_created,
                "memo_updated" => $this->memo_updated
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
            $sql = "select * from {$this->tblMemo} where 1=1 ";

            if ($this->memo_is_active !== "") {
                $sql .= "and memo_is_active = :memo_is_active ";
            }

            if ($this->search !== "") {
                $sql .= "and (
                    memo_from like :memo_from
                    or memo_to like :memo_to
                    or memo_date like :memo_date
                    or memo_category like :memo_category
                    or memo_text like :memo_text
                ) ";
            }

            $sql .= "order by memo_aid desc ";

            $query = $this->connection->prepare($sql);

            if ($this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", (int) $this->memo_is_active, PDO::PARAM_INT);
            }

            if ($this->search !== "") {
                $search = "%{$this->search}%";
                $query->bindValue(":memo_from", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_to", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_date", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_category", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_text", $search, PDO::PARAM_STR);
            }

            $query->execute();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function readLimit() {
        try {
            $sql = "select * from {$this->tblMemo} where 1=1 ";

            if ($this->memo_is_active !== "") {
                $sql .= "and memo_is_active = :memo_is_active ";
            }

            if ($this->search !== "") {
                $sql .= "and (
                    memo_from like :memo_from
                    or memo_to like :memo_to
                    or memo_date like :memo_date
                    or memo_category like :memo_category
                    or memo_text like :memo_text
                ) ";
            }

            $sql .= "order by memo_aid desc ";
            $sql .= "limit :start, :total";

            $query = $this->connection->prepare($sql);

            if ($this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", (int) $this->memo_is_active, PDO::PARAM_INT);
            }

            if ($this->search !== "") {
                $search = "%{$this->search}%";
                $query->bindValue(":memo_from", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_to", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_date", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_category", $search, PDO::PARAM_STR);
                $query->bindValue(":memo_text", $search, PDO::PARAM_STR);
            }

            $query->bindValue(":start", (int) ($this->start - 1), PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);

            $query->execute();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function update() {
        try {
            $sql = "update {$this->tblMemo} set
                memo_from = :memo_from,
                memo_to = :memo_to,
                memo_date = :memo_date,
                memo_category = :memo_category,
                memo_text = :memo_text,
                memo_updated = :memo_updated
                where memo_aid = :memo_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_updated" => $this->memo_updated,
                "memo_aid" => $this->memo_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function active() {
        try {
            $sql = "update {$this->tblMemo} set
                memo_is_active = :memo_is_active,
                memo_updated = :memo_updated
                where memo_aid = :memo_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_is_active" => $this->memo_is_active,
                "memo_updated" => $this->memo_updated,
                "memo_aid" => $this->memo_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function delete() {
        try {
            $sql = "delete from {$this->tblMemo} where memo_aid = :memo_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_aid" => $this->memo_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }
}