const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = 3301;
const db = mysql.createConnection(
    { 
        host: 'localhost',
        user: 'root',
        password: 'SwapnilOindrila062020',
        database: 'employeedb'
    },console.log(`Connected to port ${PORT}`));
    
    db.connect(err => {
        if(err) throw err;
        console.log('Databse connected.');
        Ques();
    });

    const exitQues = () =>{
        db.end();
        process.exit(1)
    }

    const Ques = ()=>{
     inquirer.prompt ([
         {
             type: 'list',
             name: 'choice',
             message: 'Welcome to kisko.Inc database. To view/add/update employee or departments information please select an option.',
             choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee','Exit',],
         },
        ]).then(userChoice => {
        
            if(userChoice.choice === 'View All Departments'){
                viewAllDepartments();
            } else if (userChoice.choice === 'View All Roles') {
                viewAllRoles();
            } else if(userChoice.choice === 'View All Employees'){
                viewAllEmployees();
            } else if(userChoice.choice === 'Add A Department'){
                addDepartment();
            } else if(userChoice.choice === 'Add A Role'){
                addRole();
            }else if(userChoice.choice === 'Add An Employee'){
                addEmployee();
            }else if(userChoice.choice === 'Exit'){
                exitQues();
            }
    });
}
    function viewAllDepartments(){
      db.query("SELECT * FROM department", function(err,data){
          if(err) throw error;
          console.table(data);
          Ques();
      });
    }
    function viewAllRoles() {
        db.query("SELECT role.*, department.name AS Department_name FROM role LEFT JOIN department ON role.department_id = department.id", 
        function(err,data){
            if(err) throw err;
            console.table(data);
            Ques();  
        });
    }
    function viewAllEmployees() {
        db.query("select employee.*, role.title, role.salary, role.department_id AS Department, employee.manager_id AS Manager from employee LEFT JOIN role ON employee.role_id = role.id",
        function(err,data){
            if(err) throw err;
            console.table(data);
            Ques();
        });
    }
















