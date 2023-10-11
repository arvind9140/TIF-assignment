import { responseData} from "../../utils/OtherFunctions.js";
import User from "../../model/userModel/usersModel.js";
import jwt from "jsonwebtoken";


const me = async(req,res) =>{
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
      }

      const accessToken = authorizationHeader.split(' ')[1];
try{
    let decoded = jwt.verify(accessToken,'abcdsbcbdhfhjdcvadvelwgpegfbchjsdvdchjdavvhebvhjdhjvhjdvwvhdj');
    if(decoded)
    {
        const findSignInUser = await User.find({token: accessToken});
        if(findSignInUser.length <1)
        {
            responseData(res, "", 404, false, "Unauthorized: Access token is missing or invalid");

        }
        else{
            const response = {
                data:{
                id:findSignInUser[0]._id,
                Name:findSignInUser[0].Name,
                email:findSignInUser[0].email,
                createdAt: findSignInUser[0].createdAt,
                }, 
                
            }
            responseData(res, "SignIn Successfully!",200,true,"", response);
        }
    }
    else{
        responseData(res, "", 404, false, "Unauthorized: Access token is missing or invalid");
    }   

}
catch(err)
{
    responseData(res, "", 500, false, "Internal Server Error!",err)
    console.log(err);
}

}
export default me;