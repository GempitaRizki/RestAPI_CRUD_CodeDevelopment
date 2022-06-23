import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.DepartmentsCtrl.findAll)
router.get('/:id',indexCtrl.DepartmentsCtrl.findOne)
router.post('/',indexCtrl.DepartmentsCtrl.create)
router.post('/next/',indexCtrl.DepartmentsCtrl.createNext,indexCtrl.EmployeesCtrl.create)
router.put('/:id',indexCtrl.DepartmentsCtrl.update)
router.delete('/:id',indexCtrl.DepartmentsCtrl.deleted)
router.put ('/sql/:id',indexCtrl.DepartmentsCtrl.querySQL)

export default router