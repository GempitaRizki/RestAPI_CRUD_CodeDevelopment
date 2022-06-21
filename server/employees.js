import dotenv from "dotenv"
import express from "express"
dotenv.config()

const Pool = require ('pg').Pool;
const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password : "admin",
    database : "HR",
    port : 5432
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port,()=>{console.log(`Serve listening on port`+port)})

app.get('/api/employees',(req,res)=>{
    pool.query('select * from employees',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/employees/:employee_id',(req,res)=>{
    const {employee_id} = req.params
    pool.query('select * from employees where employee_id =$1',
    [employee_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/employees/',(req,res)=>{
    const {employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id} = req.body
    pool.query('insert into employees (employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
    [employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.put('/api/employees/:employee_id',(req,res)=>{
    const {employee_id} = req.params
    const {name} = req.body
    pool.query("update employees set first_name = $1 where employee_id= $2",
    [name,employee_id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }) 
}) 

app.delete('/api/employees/',(req,res)=>{
    const {employee_id} = req.body
    pool.query('delete from employees where employee_id = $1',
    [employee_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})   
     





