import memberModel from "../../model/memberModel/memberModel.js";
import { responseData } from "../../utils/OtherFunctions.js";
import Community from "../../model/communityModel/communityModel.js";



const getAllMember = async (req, res) => {
    const communityId = req.query.communityId;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;

    try {
        const total = await Community.countDocuments();
        const totalPages = Math.ceil(total / itemsPerPage);
        const skip = (page - 1) * itemsPerPage;
        const memberdata = await memberModel.find({ communityId: communityId }).skip(skip).limit(itemsPerPage)
        const community = await Community.find({ _id: communityId })
        let data = [];
        for (let i = 0; i < memberdata[0].memberData.length; i++) {

            data.push({
                id: communityId,
                community: communityId,
                user: {
                    "id": memberdata[0].memberData[i].user.id,
                    "name": memberdata[0].memberData[i].user.name
                },
                role: {
                    id: memberdata[0].memberData[i].role.id,
                    name: memberdata[0].memberData[i].role.name

                }

            })

        }
        const response = {
            meta: {
                total,
                pages: totalPages,
                page,
            },
            data

        }

        responseData(res, "Get ROle Data Successfully!", 200, true, "", response);








    }
    catch (err) {
        responseData(res, "", 500, false, "Internal Server Error!", err)
        console.log(err);
    }
}
export default getAllMember