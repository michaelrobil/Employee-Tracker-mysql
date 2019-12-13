var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mikololo1@",
    database: "cms_managingsystem_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});

function runPrompt(values) {
    const prompt = inquirer.createPromptModule();
    return prompt(values);
}

function view(value) {
    console.log('value: ', value);
    connection.query("SELECT * FROM " + `${value};`, function(err, results) {
        if (err) throw err;
        console.log(results)
    });
};

function start() {
    runPrompt({
            name: "cms",
            type: "list",
            message: "Would you like to?",
            choices: ["Add or View Departments", "Add or View Roles", "Add, View or Update Employees"]
        })
        .then(function(answer) {
            let value;
            if (answer.cms === "Add or View Departments") {
                value = "department";
            } else if (answer.cms === "Add or View Roles") {
                value = "role";
            } else {
                value = "employee";
            }

            addorView(value);
            // connection.end();
        });

};

function addorView(value) {
    let choices;
    if (value === "department") {
        choices = ["Add Departments", "View Departments"];
    } else if (value === "role") {
        choices = ["Add Roles", "View Roles"];
    } else {
        choices = ["Add Employees", "View Employees", "Update Employees"];
    }

    runPrompt({
            name: "addOrView",
            type: "list",
            message: "Would you like to do?",
            choices
        })
        .then(function(answer) {
            console.log(answer, answer.addOrView);
            if (answer.addOrView === choices[0]) {
                if (value === "department") {
                    getDepartInfo();
                } else if (value === "role") {
                    getRoleInfo();
                } else {
                    getEmployeeInfo();
                }
            } else if (answer.addOrView === choices[1]) {
                console.log(value);
                if (value === "department") {
                    view("department");
                } else if (value === "role") {
                    view("role");
                } else {
                    view("employee");
                }
            } else if (answer.addOrView === choices[2]) {
                updateRoleInfo();
            } else {
                // connection.end();
            }
            start();
        });
};

function getDepartInfo() {
    runPrompt({
            name: "name",
            type: "input",
            message: "What is the department name?",
        })
        .then(function(answer) {
            connection.query(
                "INSERT INTO department SET ?", {
                    name: answer.name,
                },
                function(err) {
                    if (err) throw err;
                    else {
                        start();
                    }
                }

            );
        });
};


function getRoleInfo() {
    runPrompt([{
            name: "title",
            type: "input",
            message: "What is the title?",
        }, {
            name: "salary",
            type: "input",
            message: "What is the salary?",
        }, {
            name: "departmentName",
            type: "input",
            message: "Which department you want to assign to ?",
        }])
        .then(function(answer) {
            connection.query(
                "INSERT INTO role SET ?", {
                    title: answer.title,
                    salary: answer.salary,
                    departmentName: answer.departmentName
                },
                function(err) { if (err) throw err; }
            );
        });
};

function getEmployeeInfo() {
    runPrompt([{
            name: "firstname",
            type: "input",
            message: "What is the first name?",
        }, {
            name: "lastname",
            type: "input",
            message: "What is the last name?",
        }, {
            name: "manager",
            type: "input",
            message: "What is the manager id?",
        }, {
            name: "position",
            type: "input",
            message: "Which department you want to assign to ?",
        }])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee SET ?", {
                    firstname: answer.firstname,
                    lastname: answer.lastname,
                    position: answer.position,
                    manager: answer.manager
                },
                function(err) { if (err) throw err; }
            );
        });
};

function updateRoleInfo() {
    runPrompt([{
            name: "id",
            type: "input",
            message: "What is the employee id that you want change his/her role?",
        }, {
            name: "position",
            type: "input",
            message: "What is the new role id?",
        }])
        .then(function(answer) {
            connection.query(
                "UPDATE employee SET ? WHERE ?", [{
                        position: answer.position
                    },
                    {
                        id: answer.id
                    }
                ],
                function(error) {
                    if (error) throw err;
                }
            );
        });
};