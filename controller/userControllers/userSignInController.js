import { responseData} from "../../utils/OtherFunctions.js";
import {onlyAlphabetsValidation, onlyEmailValidation, onlyPasswordPatternValidation} from '../../utils/validation.js';
import User from "../../model/userModel/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSignIn = async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if(!onlyEmailValidation(email))
    {
        responseData(res, "", 401, false, "Invalid email !")
    }
    else if(password.length < 6 || !onlyPasswordPatternValidation(password))
    {
        responseData(res, "", 401, false, "Please enter a strong password")
    }
    else{
        try{
            const checkUser = await User.find({email:email});
            if(checkUser.length <1)
            {
                responseData(res, "", 401, false, "Invalid email or password!")
            }
            if(checkUser.length >0)
            {
                const isPasswordValid = await bcrypt.compare(password, checkUser[0].password);
                if(!isPasswordValid)
                {
                    responseData(res, "", 401, false, "Invalid email or password!")

                }
                else{
                    const accessToken = jwt.sign({ userId: checkUser[0]._id }, 'abcdsbcbdhfhjdcvadvelwgpegfbchjsdvdchjdavvhebvhjdhjvhjdvwvhdj');
                    await User.findByIdAndUpdate(checkUser[0]._id,{token:accessToken})
                        
                    const response = {
                        data:{
                        id:checkUser[0]._id,
                        Name:checkUser[0].Name,
                        email:email,
                        createdAt: checkUser[0].createdAt,
                        },
                        meta: { access_token: accessToken }
                        
                    }
                    responseData(res, "SignIn Successfully!",200,true,"", response);
                }
            }
        }
        catch(err)
        {
            responseData(res, "", 500, false, "Internal Server Error!",err)
            console.log(err);
        }
    }





}
export default userSignIn;