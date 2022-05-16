USE employeedb;

INSERT INTO department(name)
VALUES
('Quality Control'),
('Service'),
('Sales');

INSERT INTO role(title, salary, department_id)
VALUES
('Quality manager', 120000, 1),
('Service manager', 10000, 2),
('Sales manager', 10000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Oindrila' ,'Talukder', 1, 1),
('Reem', 'Vian', 2, 2),
('Trina', 'Joseph', 3, 3);
