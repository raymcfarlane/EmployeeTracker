-- created employee_db database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- SELECT DATABASE();

-- created tables within the employee_db

CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     department_id VARCHAR(30) INT NOT NULL
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     department_id VARCHAR(30) NOT NULL,
     salary DECIMAL(19, 2) NULL,
     department_id VARCHAR(30) INT NOT NULL,
     FOREIGN KEY (department_id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id),
    FOREIGN KEY (manager_id)
);



