-- created employee_db database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- SELECT DATABASE();

-- created tables within the employee_db

CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     department_name VARCHAR(30) INT NOT NULL
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     department_id INT,
     salary DECIMAL(19, 2),
     title VARCHAR(30) UNIQUE,
     FOREIGN KEY (department_id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id),
);



