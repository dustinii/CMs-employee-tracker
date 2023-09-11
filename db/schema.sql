-- Drop the existing db if it exists
DROP DATABASE IF EXISTS employees;

-- Create the database
CREATE DATABASE employees;
USE employees;

-- Department table creation
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Role table creation with foreign key to Department table
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  
  INDEX dep_ind (department_id),
  
  CONSTRAINT fk_department 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Employee table creation with foreign keys to Role and (self-referencing) Employee table for manager
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  manager_id INT UNSIGNED,
  
  INDEX role_ind (role_id),
  INDEX man_ind (manager_id),
  
  CONSTRAINT fk_role 
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    
  CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);