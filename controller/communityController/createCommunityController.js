import { responseData} from "../../utils/OtherFunctions.js";
import {onlyAlphabetsValidation} from '../../utils/validation.js';
import Role from "../../model/roleModel/roleModel.js";
import User from "../../model/userModel/usersModel.js";
import Community from "../../model/communityModel/communityModel.js";
import jwt from "jsonwebtoken";

function generateSlug(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

const createCommunity = async(req,res) =>{
    const name= req.body.name;
    const authorizationHeader = req.body.token;
    const accessToken = authorizationHeader;
    if ( name.length< 2 || !onlyAlphabetsValidation(name))
    {
        responseData(res, "", 401, false, "Invalid Name");
    }
    else if (!authorizationHeader) {
        responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
      }
      
    else{
        try{
            let decoded = jwt.verify(accessToken,'abcdsbcbdhfhjdcvadvelwgpegfbchjsdvdchjdavvhebvhjdhjvhjdvwvhdj');
            if(decoded)
            {
                const slug = generateSlug(name);
            const Users = await User.find({token:accessToken})
            if(Users.length<1)
            {
                responseData(res, "", 404, false, "Unauthorized: Access token is missing or invalid");
            }
            if(Users.length >0)
            {

                const Member = {
                    name: Users[0].Name,
                    role:"Community Admin"
                }
                const community = new Community({
                    name : name ,
                    slug: slug,
                    owner: Users[0]._id,
                    memberData:[Member],
                })
                community.save();
                const response = {
                    data:{
                    id: community._id,
                    name: name,
                    slug:slug,
                    owner:Users[0]._id,
                    created_at: community.created_at,
                    updated_at: community.updated_at
                    }
                }

                responseData(res, "Community created Successfully!",200,true,"", response);

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



}
export default createCommunity;