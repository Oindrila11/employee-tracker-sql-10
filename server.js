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
        db.query(`SELECT role.*, department.name 
        AS Department_name 
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`, 
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
    const sql1 = `SELECT role.id, role.title AS "Position" FROM role JOIN employee ON role.id = employee.role_id`;
    const sql2 = `SELECT employee.id, CONCAT(employee.first_name, ' ' ,employee.last_name) AS "Employee", CONCAT(e.first_name, ' ' ,e.last_name) AS "Manager" FROM employee LEFT JOIN employee e on employee.manager_id = e.id WHERE employee.manager_id <> "null"`;
    db.query(sql1, function (err, res1) {
      if (err) throw err;
      db.query(sql2, function (err, res2) {
        if (err) throw err;
  
       inquirer.prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "rawlist",
            name: "role_id",
            message: "What is the employee's position?",
            choices: function () {
              var choiceArr = [];
              for ( i = 0; i < res1.length; i++) {
                choiceArr.push({ name: res1[i].Position, value: res1[i].id });
              }
              return choiceArr;
            },
          },
          {
            type: "rawlist",
            name: "manager_id",
            message: "Who is this employee's manager?",
            choices: function () {
              var choiceArr = [];
              for (i = 0; i < res2.length; i++) {
                choiceArr.push({ name: res2[i].Manager, value: res2[i].id });
              }
              return choiceArr;
            },
          },
        ]).then((answer) => {
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id , manager_id) VALUES (?,?,?,?)`,
            [
              answer.first_name,
              answer.last_name,
              answer.role_id,
              answer.manager_id,
            ],
            (err, res) => {
              console.table(res, answer);
              Ques();
            }
          );
        });
      });
    });
  }
    
    const exitQues = () =>{
        db.end();
        process.exit(0)
    }
        
        

       




















