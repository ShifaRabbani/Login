-- 1. Create the database
CREATE DATABASE IF NOT EXISTS cs_society
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cs_society;

-- 2. Create the users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create a special database user just for our app
CREATE USER IF NOT EXISTS 'cs_app'@'localhost' IDENTIFIED BY 'CmputerSci@123';
GRANT ALL PRIVILEGES ON cs_society.* TO 'cs_app'@'localhost';
FLUSH PRIVILEGES;