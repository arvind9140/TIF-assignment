import express from "express";
const router =  express.Router();

import roleCreate from "../../controller/roleControllers/createRollController.js";
import getRole from "../../controller/roleControllers/getRoleController.js";


router.post("/role/",roleCreate)
router.get("/role/", getRole)





export default router;