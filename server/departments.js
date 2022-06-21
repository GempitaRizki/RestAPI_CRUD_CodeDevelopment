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

app.get('/api/departments',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/departments/:department_id',(req,res)=>{
    const {department_id} = req.params
    pool.query('select * from departments where department_id =$1',
    [department_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/departments/',(req,res)=>{
    const {department_id,department_name,location_id} = req.body
    pool.query('insert into departments (department_id,department_name,location_id) values ($1,$2,$3)',
    [department_id,department_name,location_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.put('/api/departments/:department_id',(req,res)=>{
    const {department_id} = req.params
    const {department_name} = req.body
    pool.query("update departments set department_name = $1 where department_id= $2",
    [department_name,department_id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }) 
}) 

app.delete('/api/departments/:department_id',(req,res)=>{
    const {department_id} = req.params
    pool.query('delete from departments where department_id = $1',
    [department_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})   
    





