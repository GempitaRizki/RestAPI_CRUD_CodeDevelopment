import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.DependentsCtrl.findAll)
router.get('/:id',indexCtrl.DependentsCtrl.findOne)
router.post('/',indexCtrl.DependentsCtrl.create)
router.put('/:id',indexCtrl.DependentsCtrl.update)
router.delete('/:id',indexCtrl.DependentsCtrl.deleted)
router.delete ('/sql/:id',indexCtrl.DependentsCtrl.querySQL)

export default router