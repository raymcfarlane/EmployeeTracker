INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Marketing"),
       ("Sales"),
       ("Operations"),
       ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 80000.00, 1),
       ("Marketing Associate", 70000.00, 2),
       ("Sales Rep", 65000.00, 3),
       ("Program Manager", 60000.00, 4),
       ("Support Specialist", 55000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 4, 1),
       ("Amira", "Afzal", 2, 3),
       ("Christoper", "Lee", 3, 1),
       ("Verónica", "Rodriguez", 5, 3),
       ("Igor", "Ivanov", 1, 2);                    