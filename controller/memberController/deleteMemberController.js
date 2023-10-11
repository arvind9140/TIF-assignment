import { responseData} from "../../utils/OtherFunctions.js";
import memberModel from "../../model/memberModel/memberModel.js";
import Community from "../../model/communityModel/communityModel.js";
import User from "../../model/userModel/usersModel.js";




const deleteMember = async(req,res) =>{
const memberId = req.query.id;
const authorizationHeader = req.headers.authorization;
const accessToken = authorizationHeader.split(' ')[1];
if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ') ) {
    responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
  }
try{
    let userInfo=await User.find({token : accessToken}) ;
    
    if(userInfo.length <1)
    {
        responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
    }
    if(userInfo.length >0)
    {
        
        const memberData = await memberModel.find({_id:memberId})
    if(memberData.length <1)
    {
        responseData(res, "", 404, false, "Data Not Found")
    }
    if(memberData.length>0)
    {
       
        const community = await Community.find({_id:memberData[0].communityId})
        if(community.length<1)
        {
            responseData(res, "", 404, false, "Data Not Found")
        }
        if(community.length>0)
        {
           
            if (community[0].memberData[0].role == "Community Admin")
            {
            await memberModel.deleteOne({id:memberId})
            responseData(res,"",200,true,'Deleted Successfully')
            

            }
            else{
                responseData(res, "", 403, false, "NOT_ALLOWED_ACCESS")
            }
        }

    }

    }
}
catch(err)
{
    responseData(res, "", 500, false, "Internal Server Error!",err)
    console.log(err);

}
}
export default deleteMember;