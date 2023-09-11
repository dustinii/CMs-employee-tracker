// Entryy point for the application and contains the logic for the CLI
const { prompt } = require('inquirer');
const db = require('./db');

// Start the application
init();

// Prompt the user for what action they should take
function init() {
    loadMainPrompts();
}

// Prompt the user what they want to do
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
                name: "See the budget of a Department",
                value: "VIEW_BUDGET_BY_DEPARTMENT"
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
        case "VIEW_BUDGET_BY_DEPARTMENT":
            await viewBudgetByDepartment();
            break;
        default:
            quit();
    }
};

// returns a list of all employees
async function viewEmployees() { 
    const [rows] = await db.findAllEmployees();
    console.log("\n");
    console.table(rows);
    loadMainPrompts();
};

// returns a list of all employees by manager
async function viewEmployeesByManager() { 
    const managers = await db.findAllManagers();
    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Which manager's employees do you want to view?",
        choices: managers.map(manager => ({ name: manager.name, value: manager.id }))
    });
    const employees = await db.findEmployeesByManager(managerId);
    console.table(employees);
    loadMainPrompts();
};


// returns a list of all employees by department
async function viewEmployeesByDepartment() { 
    const departments = await db.findAllDepartments();
    const { departmentId } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Which department's employees do you want to view?",
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    });
    const employees = await db.findEmployeesByDepartment(departmentId);
    console.table(employees);
    loadMainPrompts();
};

// adds an employee to the database
async function addEmployee() { 
    const roles = await db.findAllRoles();
    const managers = await db.findAllManagers();
    const { firstName, lastName, roleId, managerId } = await prompt([
        { type: "input", name: "firstName", message: "Enter employee's first name:" },
        { type: "input", name: "lastName", message: "Enter employee's last name:" },
        { type: "list", name: "roleId", message: "Select employee's role:", choices: roles.map(role => ({ name: role.title, value: role.id })) },
        { type: "list", name: "managerId", message: "Select employee's manager:", choices: [...managers.map(manager => ({ name: manager.name, value: manager.id })), { name: 'None', value: null }] }
    ]);
    await db.addEmployee(firstName, lastName, roleId, managerId);
    console.log("Employee added successfully!");
    loadMainPrompts();
};

//  removes an employee from the database
async function removeEmployee() { 
    const employees = await db.findAllEmployees();
    const { employeeId } = await prompt({
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employees.map(emp => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id }))
    });
    await db.removeEmployee(employeeId);
    console.log("Employee removed successfully!");
    loadMainPrompts();
};

// returns a list of all departments
async function viewDepartments() { 
    const departments = await db.findAllDepartments();
    console.table(departments);
    loadMainPrompts();
}

// adds a department to the database
async function addDepartment() { 
    const { departmentName } = await prompt({
        type: "input",
        name: "departmentName",
        message: "Enter the name of the new department:"
    });
    await db.addDepartment(departmentName);
    console.log("Department added successfully!");
    loadMainPrompts();
};

// removes a department from the database
async function removeDepartment() { 
    const departments = await db.findAllDepartments();
    const { departmentId } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Which department do you want to remove?",
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    });
    await db.removeDepartment(departmentId);
    console.log("Department removed successfully!");
    loadMainPrompts();
};

//  returns a list of all roles
async function viewRoles() { 
    const roles = await db.findAllRoles();
    console.table(roles);
    loadMainPrompts();
};

// adds a role to the database
async function addRole() { 
    const departments = await db.findAllDepartments();
    const { title, salary, departmentId } = await prompt([
        { type: "input", name: "title", message: "Enter the role title:" },
        { type: "input", name: "salary", message: "Enter the role salary:" },
        { type: "list", name: "departmentId", message: "Which department does this role belong to?", choices: departments.map(dept => ({ name: dept.name, value: dept.id })) }
    ]);
    await db.addRole(title, salary, departmentId);
    console.log("Role added successfully!");
    loadMainPrompts();
};

// removes a role from the database
async function removeRole() { 
    const roles = await db.findAllRoles();
    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "Which role do you want to remove?",
        choices: roles.map(role => ({ name: role.title, value: role.id }))
    });
    await db.removeRole(roleId);
    console.log("Role removed successfully!");
    loadMainPrompts();
};

// updates an employee's manager
async function updateEmployeeManager() { 
    const employees = await db.findAllEmployees();
    const managers = await db.findAllManagers();
    const { employeeId, managerId } = await prompt([
        { type: "list", name: "employeeId", message: "Which employee's manager do you want to update?", choices: employees.map(emp => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id })) },
        { type: "list", name: "managerId", message: "Select the new manager:", choices: [...managers.map(manager => ({ name: manager.name, value: manager.id })), { name: 'None', value: null }] }
    ]);
    await db.updateEmployeeManager(employeeId, managerId);
    console.log("Employee's manager updated successfully!");
    loadMainPrompts();
};

// updates an employee's role
async function updateEmployeeRole() { 
    const employees = await db.findAllEmployees();
    const roles = await db.findAllRoles();
    const { employeeId, roleId } = await prompt([
        { type: "list", name: "employeeId", message: "Which employee's role do you want to update?", choices: employees.map(emp => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id })) },
        { type: "list", name: "roleId", message: "Select the new role:", choices: roles.map(role => ({ name: role.title, value: role.id })) }
    ]);
    await db.updateEmployeeRole(employeeId, roleId);
    console.log("Employee's role updated successfully!");
    loadMainPrompts();
};

// returns the budget of a department
async function viewBudgetByDepartment() {
    const departments = await db.findAllDepartments();
    const { departmentId } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Which department's budget do you want to view?",
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    });
    const budget = await db.findBudgetByDepartment(departmentId);
    console.log("\n");
    console.table(budget);
    loadMainPrompts();
}

// exits the application
function quit() {
    console.log("Peace out, cutie patootie!");
    process.exit();
}