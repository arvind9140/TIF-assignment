import express from "express";
const router = express.Router();
import addMember from "../../controller/memberController/addmemberConteroller.js";
import deleteMember from "../../controller/memberController/deleteMemberController.js";



router.post("/member/", addMember)
router.delete("/member/", deleteMember)


export default router;
