const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
)

async function determineDBQuery(val) {

    switch (val) {

        case "View All Departments":
            db.query('SELECT * FROM department', function (err, results) {
                console.table((results));
            });
            break;

        case "View All Roles":
            db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function (err, results) {
                console.table((results));
            });
            break;

        case "View All Employees":
            db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Employee_Full_Name, employee.role_id AS Role_Title, role.title, role.salary AS Role_Salary, role.department_id, department.department_name, employee.manager_id, CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Full_Name FROM employees employee JOIN employees manager ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {

                console.table((results));
            });
            break;
    }
}

function addDepartment(val) {
    db.query('INSERT IGNORE INTO department (department_name) VALUES(?)', val, function (err, results) {
        if (results.warningStatus > 0) {
            db.query('SHOW WARNINGS', function (err, results) { console.log(results[0].Message) });
        } else {
            console.log(`${val} added to Departments Table!`);
        }
    });
}

async function addRole(dept_id, title, salary) {
    db.query('INSERT IGNORE INTO role (department_id, title, salary) VALUES(?, ?, ?)', [dept_id, title, salary], function (err, results) {
        if (results.warningStatus > 0) {
            db.query('SHOW WARNINGS', function (err, results) { console.log(results[0].Message) });
        } else {
            console.log(`${title } added to Roles Table!`);
        }
    });
}

async function addEmployee(fn, ln, role_id, manager_id) {
    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [fn, ln, role_id, manager_id], function (err, results) {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`${fn} ${ln} added to the Employee Table!`)
        }
    });
}

async function updateEmploee(role_ID, employee_id) {
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_ID, employee_id], function (err, results) {
        console.log("Employee updated!");
    })
}

async function getAllRoles() {
    const role = await db.promise().query('SELECT id, title FROM role')
    const roleChoices = role[0].map(({ id, title }) => ({
        name: `${title}`,
        value: id
    }));
    return roleChoices;
}

async function getAllDepartments() {
    const dept = await db.promise().query('SELECT id, department_name FROM department')
    const deptChoices = dept[0].map(({ id, department_name }) => ({
        name: `${department_name}`,
        value: id
    }));
    return deptChoices;
}

async function getAllEmployees() {
    const allEmployes = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS Employee_Name FROM employees')
    const employeeChoices = allEmployes[0].map(({ id, Employee_Name }) => ({
        name: `${Employee_Name}`,
        value: id
    }));
    return employeeChoices;
}

module.exports = { determineDBQuery, addDepartment, addRole, addEmployee, getAllRoles, getAllDepartments, getAllEmployees, updateEmploee };