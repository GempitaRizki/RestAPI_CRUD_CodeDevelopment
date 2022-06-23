import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.CountriesCtrl.findAll)
router.get('/:id',indexCtrl.CountriesCtrl.findOne)
router.post('/',indexCtrl.CountriesCtrl.create)
router.post('/next/',indexCtrl.CountriesCtrl.createNext,indexCtrl.LocationsCtrl.create)
router.put('/:id',indexCtrl.CountriesCtrl.update)
router.delete('/:id',indexCtrl.CountriesCtrl.deleted)
router.post ('/sql/',indexCtrl.CountriesCtrl.querySQL)

export default router