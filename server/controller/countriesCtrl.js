import { sequelize } from "../models/init-models"

//express js example 
// const express = require('express')
// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

const findAll = async (req,res)=>{
    try {
        const countries = await req.context.models.countries.findAll({
            include: [{
               // all: true
               model : req.context.models.locations,
               as : "locations",
               require : true,
               left : true
            }]
        })
        return res.send(countries)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const countries = await req.context.models.countries.findOne({
            where:{country_id : req.params.id}
        })
        return res.send(countries)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekReg = req.regions
    try {
        const countries = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : cekReg.region_id
        })
        return res.send(countries)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const countries = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : req.body.region_id
        })
        req.countries = countries
        next()
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

// const create = async (req,res)=>{
//     try {
//         const countries = await req.context.models.countries.create({
//             country_id : req.body.country_id,
//             country_name : req.body.country_name,
//             region_id : req.body.region_id
//         })
//         return res.send(countries)
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }


const update = async (req,res)=>{
    try {
        const countries = await req.context.models.countries.update({
            country_name : req.body.country_name,
            region_id : req.body.region_id
        },{ returning : true , where:{country_id : req.params.id}})
        return res.send(countries)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const countries = await req.context.models.countries.destroy({
            where:{country_id : req.params.id}
        })
        return res.send('delete '+countries+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('insert into countries (country_id,country_name,region_id) values (:countryId,:countryName,:regionId)',
        {replacements : {
        countryId : req.body.country_id,
        countryName : req.body.country_name,
        regionId : req.body.region_id},
        type : sequelize.QueryTypes.INSERT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

// const querySQL = async(req,res)=>{
//     try {
//         await sequelize.query('SELECT * from countries where country_id = :countriesId',
//         {replacements : {countriesId : req.params.id},type : sequelize.QueryTypes.SELECT})
//         .then(result =>{
//             return res.send(result)
//         })
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }

export default {
    findAll,
    findOne,
    create,
    createNext,
    update,
    deleted,
    querySQL
}