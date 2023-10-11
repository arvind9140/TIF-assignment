import express from "express";
const router =  express.Router();
import userSignup from "../../controller/userControllers/userSignupController.js";
import userSignIn from "../../controller/userControllers/userSignInController.js";
import me from "../../controller/userControllers/meController.js";



router.post("/signup/", userSignup);
router.post("/signin/",userSignIn);
router.get("/me/",me);

export default router;