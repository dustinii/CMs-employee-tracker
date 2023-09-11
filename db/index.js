const connection = require("./connection");

// EmployeeDB, RoleDB, and DepartmentDB classes
class EmployeeDB {
    constructor(connection) {
        this.connection = connection;
    }

    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.promise().query(
            `
            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                CONCAT(manager.first_name, " ", manager.last_name) AS manager
            FROM
                employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            `
        )
    }

    // Find all employees except the given employee id
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            `
            SELECT
                id,
                first_name,
                last_name
            FROM
                employee
            WHERE
                id != ?
            `, employeeId
        )
    }
    
    createEmployee(employee) {
        return this.connection.promise().query(
            `
            INSERT INTO employee
            SET ?
            `, employee
        )
    }

    removeEmployee(employeeId) {
        return this.connection.promise().query(
            `
            DELETE FROM employee
            WHERE id = ?
            `, employeeId
        )
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            `
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
            `, [roleId, employeeId]
        )
    }

    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            `
            UPDATE employee
            SET manager_id = ?
            WHERE id = ?
            `, [managerId, employeeId]
        )
    }

    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            `
            SELECT employee.id, employee.first_name, employee.last_name, role.title
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ?;
            `,
            departmentId
        )
    }

    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query()
            `
        SELECT employee.id, employee.first_name, employee.last_name, DEPARTMENT.name AS department, role.title
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE employee.manager_id = ?;
        `,
            managerId
    }
}
class RoleDB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }
}

class DepartmentDB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    viewDepartmentBudgets() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    removeDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?", departmentId
        );
    }
}

// Export employee, role, and department classes
module.exports = {
    Employee: new EmployeeDB(connection),
    Role: new RoleDB(connection),
    Department: new DepartmentDB(connection)
};