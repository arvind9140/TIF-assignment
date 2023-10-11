import { responseData } from "../../utils/OtherFunctions.js";
import Community from "../../model/communityModel/communityModel.js";
import Role from "../../model/roleModel/roleModel.js";
import User from "../../model/userModel/usersModel.js";
import Member from "../../model/memberModel/memberModel.js"
import jwt from "jsonwebtoken";


const addMember = async (req, res) => {
    const communityId = req.body.communityId;
    const userId = req.body.userId;
    const roleId = req.body.roleId;
    const authorizationHeader = req.body.token;
    const accessToken = authorizationHeader;

    if (!communityId || !userId || !roleId) {

        responseData(res, "", 404, false, "Community, user, or role not found!")
    }
    else if (!authorizationHeader) {
        responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
    }
    else {
        try {
            let decoded = jwt.verify(accessToken, 'abcdsbcbdhfhjdcvadvelwgpegfbchjsdvdchjdavvhebvhjdhjvhjdvwvhdj');
            if (decoded) {
                const UserDataFound = await User.find({ $and: [{ id: userId, token: accessToken }] });
                if (UserDataFound.length < 1) {
                    responseData(res, "", 401, false, "Unauthorized: Access token is missing or invalid");
                }
                if (UserDataFound.length > 0) {





                    const community = await Community.find({ _id: communityId });
                    if (community.length < 1) {
                        responseData(res, "", 404, false, "Community Not FOund!")

                    }
                    if (community.length > 0) {


                        if (community[0].memberData[0].role == "Community Admin") {
                            const memberExist = await Member.find({ communityId: communityId })
                            if (memberExist.length > 0) {
                                const user = await User.find({ _id: userId })
                                const role = await Role.find({ _id: roleId })
                                const data ={
                                    user: {
                                        id: userId,
                                        name: user[0].Name
                                    },
                                    role: {
                                        id: roleId,
                                        name: role[0].name

                                    }
                                }
                            const updatedData = await Member.findOneAndUpdate(
                                {},
                                { $push: { memberData: data } },
                                { new: true, upsert: true }
                              );
                                const response = {
                                    data: {
                                        id: updatedData._id,
                                        community: communityId,
                                        Role: roleId,
                                        User: userId,
                                        created_at: updatedData.created_at
                                    }
    
                                }
                                responseData(res, "Member Data Successfully!", 200, true, "", response);   


                            }
                            if (memberExist.length < 1) {
                                const user = await User.find({ _id: userId })
                                const role = await Role.find({ _id: roleId })


                                const memberdata =
                                {
                                    user: {
                                        id: userId,
                                        name: user[0].Name
                                    },
                                    role: {
                                        id: roleId,
                                        name: role[0].name

                                    }

                                }
                                const member = new Member({
                                    communityId: communityId,
                                    memberData: [memberdata]
                                })
                                member.save()
                                const response = {
                                    data: {
                                        id: member._id,
                                        community: communityId,
                                        Role: roleId,
                                        User: userId,
                                        created_at: member.created_at
                                    }
    
                                }
                                responseData(res, "Member Data Successfully!", 200, true, "", response);   
                            }
                            
                        }

                        else {
                            responseData(res, "", 403, false, "NOT_ALLOWED_ACCESS")
                        }
                    }



                }
            }
            else {
                responseData(res, "", 404, false, "Unauthorized: Access token is missing or invalid");
            }

        }
        catch (err) {
            responseData(res, "", 500, false, "Internal Server Error!", err)
            console.log(err);
        }
    }
}
export default addMember;