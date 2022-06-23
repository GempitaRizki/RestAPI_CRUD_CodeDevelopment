import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import uploadDownload from "../../middleware/uploadDownload";

const router = Router()

router.get('/',indexCtrl.EmployeesCtrl.findAll)
router.get('/:id',indexCtrl.EmployeesCtrl.findOne)
router.post('/',indexCtrl.EmployeesCtrl.create)
router.post('/next/',indexCtrl.EmployeesCtrl.createNext,indexCtrl.DependentsCtrl.create)
router.put('/:id',indexCtrl.EmployeesCtrl.update)
router.delete('/:id',indexCtrl.EmployeesCtrl.deleted)
router.get ('/sql/:id',indexCtrl.EmployeesCtrl.querySQL)
router.post('/',uploadDownload.uploadFiles,indexCtrl.EmployeesCtrl.createNew)

export default router