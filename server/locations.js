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

app.get('/api/locations',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/locations/:location_id',(req,res)=>{
    const {location_id} = req.params
    pool.query('select * from locations where location_id =$1',
    [location_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/locations/',(req,res)=>{
    const {location_id,street_address,postal_code,city,state_province,country_id} = req.body
    pool.query('insert into locations (location_id,street_address,postal_code,city,state_province,country_id) values ($1,$2,$3,$4,$5,$6)',
    [location_id,street_address,postal_code,city,state_province,country_id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.put('/api/locations/',(req,res)=>{
    const {street_address,location_id} = req.body
    pool.query("update locations set street_address = $1 where location_id= $2",
    [street_address,location_id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
}) 

app.delete('/api/locations/:location_id',(req,res)=>{
    const {location_id} = req.params
    pool.query('delete from locations where location_id = $1',
    [location_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})   
    





