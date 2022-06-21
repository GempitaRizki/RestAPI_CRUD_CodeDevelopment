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

app.get('/api/jobs',(req,res)=>{
    pool.query('select * from jobs',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/jobs/:job_id',(req,res)=>{
    const {dependent_id} = req.params
    pool.query('select * from jobs where job_id =$1',
    [job_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/jobs/',(req,res)=>{
    const {job_id,job_title,min_salary,max_salary} = req.body
    pool.query('insert into jobs (job_id,job_title,min_salary,max_salary) values ($1,$2,$3,$4)',
    [job_id,job_title,min_salary,max_salary],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows) 
    })
})
app.put('/api/jobs/:job_id',(req,res)=>{
    
    const {job_id} = req.params
    const {title} = req.body
    pool.query("update jobs set job_title = $1 where job_id= $2",
    [title,job_id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }) 
}) 

app.delete('/api/jobs/',(req,res)=>{
    const {job_id} = req.body
    pool.query('delete from jobs where job_id = $1',
    [job_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})   
     
    





