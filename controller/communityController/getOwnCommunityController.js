import { responseData} from "../../utils/OtherFunctions.js";
import Community from "../../model/communityModel/communityModel.js";
import usersModel from "../../model/userModel/usersModel.js";


const getOwnCommunity = async(req,res) =>{
    const communityId = req.query.communityId;
    const authorizationHeader = req.query.token;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;
    const accessToken = authorizationHeader;
    if (!authorizationHeader) {
        responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
      }

      try{
        const checkToken = await usersModel.find({token:accessToken})
        const total = await Community.countDocuments();
        const totalPages = Math.ceil(total / itemsPerPage);
        const skip = (page - 1) * itemsPerPage;
        if(checkToken.length<1)
        {
            responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
        }
        if(checkToken.length>0)
        {
            const community = await Community.find({_id: communityId}).skip(skip) .limit(itemsPerPage)
        if(community.length<1)
        {
            responseData(res, "", 404, false, "Community Not Found!");
        }
        if(community.length >0)
        {
            const response = {
                meta: {
                    total,
                    pages: totalPages,
                    page,
                  },
                  community
            }

            responseData(res, "Community created Successfully!",200,true,"", response);
        }

        }

      }
      catch(err)
      {
        responseData(res, "", 500, false, "Internal Server Error!",err)
        console.log(err);
      }
    
    



}
export default getOwnCommunity;