import dotenv from "dotenv"
import express from "express"
dotenv.config()

const Pool = require('pg').Pool;
const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password  : "admin",
    database : "HR",
    port : 5432
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port,()=>{console.log('Server listening on port '+port)})

app.get('/api/countries',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/countries/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from countries where region_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/countries/',(req,res)=>{
    const {country_id,country_name,region_id} = req.body // mengambil dari req body
    pool.query('insert into countries (country_id,country_name,region_id) values ($1,$2,$3)', // representasi value
    [country_id,country_name,region_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/countries/:country_id',(req,res)=>{
    const {country_id} = req.params
    const {country_name} = req.body
    pool.query('update countries set country_id = $1 where country_name = $2',
    [country_id,country_name],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/countries/:country_name',(req,res)=>{
    const {country_id} = req.params
    pool.query('delete from countries where country_id = $1',
    [country_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})    