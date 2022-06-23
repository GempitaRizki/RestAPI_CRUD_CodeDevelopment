import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/signup',indexCtrl.userCtrl.signup)

export default router