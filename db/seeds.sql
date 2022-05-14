USE employeedb;

INSERT INTO department(name)
VALUES
('Oindrila'),
('Reem'),
('Trina');

INSERT INTO role(title, salary, department_id)
VALUES
('Manager', 120000, 1),
('Advisor', 10000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Oindrila' ,'Talukder', 1, 1),
('Reem', 'Vian', 2, 2);
