<?php

namespace database

{
    class Message
    {
        public $id;
        public $message;
        public $created_at;

        public function __construct($id, $message, $created_at)
        {
            $this->id = $id;
            $this->message = $message;
            $this->created_at = $created_at;
        }
    }
}