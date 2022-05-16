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
        process.exit(0)
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
      db.query(`SELECT * FROM department`, function(err,results){
          if(err) throw error;
          console.table(results);
          Ques();
      });
    }
    function viewAllRoles() {
        db.query(`SELECT role.*, department.name AS Department_name FROM role LEFT JOIN department ON role.department_id = department.id`, 
        function(err,results){
            if(err) throw err;
            console.table(results);
            Ques();  
        });
    }
    function viewAllEmployees() {
        db.query(`select employee.*, role.title, role.salary, role.department_id AS Department, employee.manager_id AS Manager from employee LEFT JOIN role ON employee.role_id = role.id`,
        function(err,results){
            if(err) throw err;
            console.table(results);
            Ques();
        });
    }

    function addDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'What department would you like to add?'
            }
        ]).then((answer) => {
        db.query(`INSERT INTO department(name) VALUES(?)`, [answer.addDepartment], function (err) {
            if(err) throw err;
            console.log("Department added");
            Ques();
        })
    })
    };

function addRole() {
   inquirer.prompt([
       {
           type: 'input',
           name: 'role',
           message: 'Enter title for the role'
       },
       {
        type: 'number',
        name: 'salary',
        message: 'Enter salary for the role'  
       },
       {
           type: 'number',
           name: 'department_id',
           message: 'choose department id for the role'
       }
   ]).then((answer) => {
     db.query("INSERT INTO role SET?",
     {
         title: answer.role,
         salary: answer.salary,
         department_id: answer.department_id
     },
     function(err){
     if(err) throw err
    console.log('Role has been added')
     Ques();
    })
   })
};

function addEmployee() {
   db.query("SELECT * FROM role", function(err, results){
       if(err) throw error;
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee'
        },
        {

            type: 'rawlist',
            name: 'role',
            choices: function(){
                var choiceArr = [];
                for(i=0; i< results.length; i++){
                    choiceArr.push(results[i].title)
                }
                return choiceArr;
            },
            message: 'Select title'
        },
        {
            name: 'manager',
            type: 'number',
            validate: function(value) {
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            },
            message: 'Select manager ID '
            
        }
      
    ])
        .then(function(answer) {
            //let managerId = newManager.indexOf(results.managerid)
          db.query("INSERT INTO employee SET ?", 
          {first_name: answer.firstName,
            last_name: answer.lastName, 
            role_id: answer.role, 
            manager_id: answer.manager
          }
          )
              console.log("Employee has been added");
              Ques();
              
          });
        });
    }
    
        
        

       




















