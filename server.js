const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const PORT = 3306;
const db = mysql.createConnection(
    { 
        host: 'localhost',
        user: 'root',
        password: 'SwapnilOindrila062020',
        database: 'employeedb'
    });
    
    db.connect(err => {
        if(err) throw err;
        console.log('Databse connected.');
       startPrompt();
    });

    











