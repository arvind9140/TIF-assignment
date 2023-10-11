import { responseData} from "../../utils/OtherFunctions.js";
import {onlyAlphabetsValidation} from '../../utils/validation.js';
import Role from "../../model/roleModel/roleModel.js";





const roleCreate = async(req,res)=>{
    const role = req.body.name;

    if ( role.length< 2 || !onlyAlphabetsValidation(role))
    {
        responseData(res, "", 401, false, "Invalid Role");
    }

    else{

        try{
            let newRole=new Role({
                name:role
            })
            newRole.save();
            const response = {
                data:{
                id: newRole._id,
               name: role,
                created_at: newRole.createdAt,
                updated_at: newRole.updatedAt
                 }

            }
            responseData(res, "Role Created Successfully!",200,true,"", response);
        }
        catch(err)
        {
            responseData(res, "", 500, false, "Internal Server Error!",err)
            console.log(err);
        }
    }

}
export default roleCreate;