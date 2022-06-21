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

app.get('/api/dependents',(req,res)=>{
    pool.query('select * from dependents',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/dependents/:dependent_id',(req,res)=>{
    const {dependent_id} = req.params
    pool.query('select * from dependents where dependent_id =$1',
    [dependent_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/dependents/',(req,res)=>{
    const {dependent_id,first_name,last_name,relationship,employee_id} = req.body
    pool.query('insert into dependents (dependent_id,first_name,last_name,relationship,employee_id) values ($1,$2,$3,$4,$5)',
    [dependent_id,first_name,last_name,relationship,employee_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows) 
    })
})
app.put('/api/dependents/',(req,res)=>{
    
    const {dependent_id,name} = req.body
    pool.query("update dependents set first_name = $1 where dependent_id= $2",
    [name,dependent_id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }) 
}) 

app.delete('/api/dependents/',(req,res)=>{
    const {dependent_id} = req.body
    pool.query('delete from dependents where dependent_id = $1',
    [dependent_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})   
    