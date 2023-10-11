import express from "express";
 const router = express.Router();
 import createCommunity from "../../controller/communityController/createCommunityController.js";
import getallCommunity from "../../controller/communityController/getallCommunityController.js";
import getOwnCommunity from "../../controller/communityController/getOwnCommunityController.js";
import getjoinMember from "../../controller/communityController/joinCommunityController.js";
import getAllMember from "../../controller/memberController/getAllMemberController.js";


router.post("/community/", createCommunity)
router.get("/community/", getallCommunity)
router.get("/community/member/", getAllMember)
router.get("/community/me/owner/", getOwnCommunity)
router.get("/community/me/member/", getjoinMember)

 export default router;
