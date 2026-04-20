-- sql_setup.sql
-- Run this FIRST in phpMyAdmin (SQL tab) before testing the form

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS event_db;

-- Step 2: Select the database
USE event_db;

-- Step 3: Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100)  NOT NULL,
    email       VARCHAR(100)  NOT NULL,
    event_date  DATE,
    tickets     INT           DEFAULT 1,
    tshirt_size VARCHAR(5),
    skill_level INT,
    mode        VARCHAR(20),
    comments    TEXT,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- To view all submitted registrations:
-- SELECT * FROM registrations;