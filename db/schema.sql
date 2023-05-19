-- created employee_db database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- SELECT DATABASE();

-- created tables within the employee_db
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     id INT NOT NULL,
      name VARCHAR(100) NOT NULL
);

CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     id INT NOT NULL,
      name VARCHAR(100) NOT NULL
);
