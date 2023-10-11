import { responseData} from "../../utils/OtherFunctions.js";
import {onlyAlphabetsValidation, onlyEmailValidation, onlyPasswordPatternValidation} from '../../utils/validation.js';
import User from "../../model/userModel/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSignup = async(req,res) =>{
    const Name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if ( Name.length< 2 || !onlyAlphabetsValidation(Name))
    {
        responseData(res, "", 401, false, "Invalid Name");
    }
    else if(!onlyEmailValidation(email))
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
            if(checkUser.length >0)
            {
                responseData(res, "", 401, false, "Email already exist.")
            }
            if(checkUser.length <1)
            {
                bcrypt.hash(password, 10, async function(err, hash){
                    if (err) {
                        responseData(res, "",401,false,"Password hash not created try after sometime");
                    }
                    else{
                        const user = new User({
                            Name : Name ,
                            email: email,
                            password:hash,
                            token:"",
                            status:true,
                    
                        })
                        user.save();
                        const accessToken = jwt.sign({ userId: user._id }, 'abcdsbcbdhfhjdcvadvelwgpegfbchjsdvdchjdavvhebvhjdhjvhjdvwvhdj');
                        await User.findByIdAndUpdate(user._id,{token:accessToken});
                        
                        const response = {
                            data:{
                            id:user._id,
                            Name:Name,
                            email:email,
                            createdAt: user.createdAt,
                            },
                            meta: { access_token: accessToken }
                            
                        }
                        responseData(res, "Account Created Successfully!",201,true,"", response);


                    }
                })
            }
        }
        catch(err)
        {
            responseData(res, "", 500, false, "Internal Server Error!",err)
            console.log(err);
        }
    }
}
export default userSignup;


