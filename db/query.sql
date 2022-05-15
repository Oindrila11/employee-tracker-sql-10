-- view all role--
`SELECT role.*, department.name 
             AS Department_name 
             FROM role
             LEFT JOIN department
             ON role.department_id = department.id`
--view all employee--
`select employee.*, role.title, role.salary, role.department_id AS Department, employee.manager_id AS Manager
    - from employee
    - LEFT JOIN role ON employee.role_id = role.id;`             