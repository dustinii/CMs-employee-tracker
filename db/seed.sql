-- Using the employees database
USE employees;

-- Insert new unique departments
INSERT INTO department 
    (name)
VALUES 
    ('Marketing'),
    ('Research & Development'),
    ('Human Resources'),
    ('Support');

-- Insert unique roles with their associated departments
INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Marketing Manager', 110000, 1),
    ('Marketing Associate', 75000, 1),
    ('Senior R&D Engineer', 170000, 2),
    ('R&D Associate', 130000, 2),
    ('HR Lead', 140000, 3),
    ('Recruitment Specialist', 90000, 3),
    ('Support Team Lead', 95000, 4),
    ('Customer Support Specialist', 70000, 4);

-- Insert unique employees with their roles and managers
INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Emma', 'Watson', 1, NULL),
    ('Liam', 'Hemsworth', 2, 1),
    ('Sophia', 'Turner', 3, NULL),
    ('Lucas', 'Scott', 4, 3),
    ('Olivia', 'Harper', 5, NULL),
    ('Aiden', 'Smith', 6, 5),
    ('Ava', 'Williams', 7, NULL),
    ('Noah', 'Brown', 8, 7);
