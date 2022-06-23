import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.findAll()
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.findOne({
            where:{employee_id : req.params.id}
        })
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekJobs = req.jobs
    const cekDep = req.departments
    try {
        const employees = await req.context.models.employees.create({
            employee_id : req.body.employee_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : cekJobs.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : cekDep.department_id
        })
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const employees = await req.context.models.employees.create({
            employee_id : req.body.employee_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        })
        req.employees = employees
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

// const create = async (req,res)=>{
//     try {
//         const employees = await req.context.models.employees.create({
//             employee_id : req.body.employee_id,
//             first_name : req.body.first_name,
//             last_name : req.body.last_name,
//             email : req.body.email,
//             phone_number : req.body.phone_number,
//             hire_date : req.body.hire_date,
//             job_id : req.body.job_id,
//             salary : req.body.salary,
//             manager_id : req.body.manager_id,
//             department_id : req.body.department_id
//         })
//         return res.send(employees)
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }
const update = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        },{ returning : true , where:{employee_id : req.params.id}})
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employees+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

//QuerySql
const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT * from employees JOIN jobs ON employees.job_id = jobs.job_id where employees.employee_id = :employeesId',
        {replacements : {employeesId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

//upload file 
const createNew = async(req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.employees.create({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number : fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt(fields[6].value),
            department_id : parseInt(fields[7].value),
            emp_profile : files[0].file.newFilename
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    createNext,
    update,
    deleted,
    querySQL,
    create,
    createNew
}