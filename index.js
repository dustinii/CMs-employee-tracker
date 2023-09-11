const { prompt } = require('inquirer');
const db = require('./db');

init();

function init() {
    loadMainPrompts();
}

async function loadMainPrompts(){};

async function viewEmployees() {};

async function viewEmployeesByManager() {};
async function viewEmployeesByDepartment() {};

async function addEmployee() {};
async function removeEmployee() {};

async function viewDepartments() {}
async function addDepartment() {};
async function removeDepartment() {};

async function viewRoles() {};
async function addRole() {};
async function removeRole() {};

async function updateEmployeeManager() {};
async function updateEmployeeRole() {};

function quit() {
    console.log("Peace out, cutie patootie!");
    process.exit();
}