const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    port: '3001',
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

function addEmployeePrompt() {
  inquirer
      .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to do?",
          choices: [
              "View All Employees",
              "View All Roles",
              "View All Departments",
              "Add Employee",
              "Add Role",
              "Add Department",
              "Update Employee Role",
              "Exit"
          ]
      })
      .then(function (answer) {
          switch (answer.action) {
              case "View All Employees":
                  viewEmployees();
                  break;

              case "View All Roles":
                  viewRoles();
                  break;

              case "View All Departments":
                  viewDepartments();
                  break;

              case "Add Employee":
                  addEmployee();
                  break;

              case "Add Role":
                  addRole();
                  break;

              case "Add Department":
                  addDepartment();
                  break;

              case "Update Employee Role":
                  updateEmployeeRole();
                  break;

              case "Exit":
                  exitPrompt();
                  break;
          }
      });
}

function viewEmployees() {
  console.log("Viewing all employees...\n");
  con.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      addEmployeePrompt();
  });
}

function viewRoles() {
  console.log("Viewing all roles...\n");
  con.query("SELECT * FROM employee_role", function (err, res) {
      if (err) throw err;
      console.table(res);
      addEmployeePrompt();
  });
}

function viewDepartments() {
  console.log("Viewing all departments...\n");
  con.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      addEmployeePrompt();
  });
}
function addEmployee() {
  inquirer
      .prompt([
          {
              name: "first_name",
              message: "Enter employee first name:",
              type: "input"
          },
          {
              name: "last_name",
              message: "Enter employee last name:",
              type: "input"
          },
          {
              name: "role_id",
              message: "Enter role ID:",
              type: "input",
          },
          {
              name: "manager_id",
              message: "Enter manager ID:",
              type: "input",
          }
      ])
      .then(function ({ first_name, last_name, role_id, manager_id }) {
          con.query("INSERT INTO employee SET ?",
              {
                  first_name: first_name,
                  last_name: last_name,
                  role_id: role_id,
                  manager_id: manager_id
              },
              function (err, res) {
                  if (err) throw err;
                  console.log(`Successfully added ${first_name} ${last_name} into employee table!`)
                  viewEmployees();
                  addEmployeePrompt();
              })
      })
}

function addRole() {
  inquirer
      .prompt([
          {
              name: "title",
              message: "Enter role title:",
              type: "input"
          },
          {
              name: "salary",
              message: "Enter salary:",
              type: "input"
          },
          {
              name: "department_id",
              message: "Enter department ID:",
              type: "input"
          }
      ])
      .then(function ({ title, salary, department_id }) {
          con.query("INSERT INTO employee_role SET ?",
              {
                  title: title,
                  salary: salary,
                  department_id: department_id,
              },
              function (err, res) {
                  if (err) throw err;
                  console.log(`Successfully added ${title} into role table!`)
                  viewRoles();
                  addEmployeePrompt();
              })
      })
}

function addDepartment() {
  inquirer
      .prompt([
          {
              name: "department_name",
              message: "Enter department name:",
              type: "input"
          }
      ])
      .then(function ({ department_name }) {
          con.query("INSERT INTO department SET ?",
              {
                  name: department_name
              },
              function (err, res) {
                  if (err) throw err;
                  console.log(`Successfully added ${department_name} into department table!`)
                  viewDepartments();
                  addEmployeePrompt();
              })
      })
}



function updateEmployeeRole() {
  con.query(
      "SELECT * FROM employee_role",
      function (err, res) {
          if (err) throw err;
          const roles = res;
          console.table(roles);
          inquirer
              .prompt([
                  {
                      type: "input",
                      message: "Enter employee's ID:",
                      name: "employee_id"
                  },
                  {
                      type: "list",
                      message: "Choose new employee role:",
                      choices: function() {
                          const choiceArray = [];
                          for (let i = 0; i < res.length; i++) {
                            choiceArray.push(`${res[i].id} ${res[i].title}`);
                          }
                          return choiceArray;
                        },
                      name: "chosenRole"
                  }
              ])
              .then(function ({ employee_id, chosenRole }) {
                  console.log("Updating employee role...\n");
                  con.query(
                      "UPDATE employee SET ? WHERE ?",
                      [
                          {
                              role_id: chosenRole.split(" ")[0]
                          },
                          {
                              id: employee_id
                          }
                      ],
                      function (err, res) {
                          if (err) throw err;
                          console.log(`Employee ${employee_id}'s role has been updated to ${chosenRole}\n`);
                          viewEmployees();
                          addEmployeePrompt();
                      }
                  );
              })
      })
}

function exitPrompt() {
  con.end();
}

