const { prompt } = require('inquirer');
const db = require('./db');

init();

function init() {
    loadMainPrompts();
}

async function loadMainPrompts() {
    const { choice } = await prompt({
        type: 'list',
        name: 'choice',
        message: 'State your objective, human.',
        choices: [
            {
                name: 'See all employees',
                value: 'VIEW_EMPLOYEES'
            },
            {
                name: 'See all employees by manager',
                value: 'VIEW_EMPLOYEES_BY_MANAGER'
            },
            {
                name: 'See all employees by department',
                value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
            },
            {
                name: 'Add an employee',
                value: 'ADD_EMPLOYEE'
            },
            {
                name: 'Remove an employee',
                value: 'REMOVE_EMPLOYEE'
            },
            {
                name: 'Update an employee\'s manager',
                value: 'UPDATE_EMPLOYEE_MANAGER'
            },
            {
                name: 'Update an employee\'s role',
                value: 'UPDATE_EMPLOYEE_ROLE'
            },
            {
                name: "See all Roles",
                value: "VIEW_ROLES"
            },
            {
                name: "Add a Role",
                value: "ADD_ROLE"
            },
            {
                name: "Remove a Role",
                value: "REMOVE_ROLE"
            },
            {
                name: "See all Departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "Add a Department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Remove a Department",
                value: "REMOVE_DEPARTMENT"
            },
            {
                name: "See the total utilized budget of a Department",
                value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
            },
            {
                name: "Quit",
                value: "QUIT"
            }
        ]
    });

    switch (choice) {
        case "VIEW_EMPLOYEES":
            await viewEmployees();
            break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
            await viewEmployeesByManager();
            break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            await viewEmployeesByDepartment();
            break;
        case "ADD_EMPLOYEE":
            await addEmployee();
            break;
        case "REMOVE_EMPLOYEE":
            await removeEmployee();
            break;
        case "UPDATE_EMPLOYEE_MANAGER":
            await updateEmployeeManager();
            break;
        case "UPDATE_EMPLOYEE_ROLE":
            await updateEmployeeRole();
            break;
        case "VIEW_DEPARTMENTS":
            await viewDepartments();
            break;
        case "ADD_DEPARTMENT":
            await addDepartment();
            break;
        case "REMOVE_DEPARTMENT":
            await removeDepartment();
            break;
        case "VIEW_ROLES":
            await viewRoles();
            break;
        case "ADD_ROLE":
            await addRole();
            break;
        case "REMOVE_ROLE":
            await removeRole();
            break;
        case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
            await viewUtilizedBudgetByDepartment();
            break;
        default:
            quit();
    }
};

async function viewEmployees() { };

async function viewEmployeesByManager() { };
async function viewEmployeesByDepartment() { };

async function addEmployee() { };
async function removeEmployee() { };

async function viewDepartments() { }
async function addDepartment() { };
async function removeDepartment() { };

async function viewRoles() { };
async function addRole() { };
async function removeRole() { };

async function updateEmployeeManager() { };
async function updateEmployeeRole() { };

function quit() {
    console.log("Peace out, cutie patootie!");
    process.exit();
}