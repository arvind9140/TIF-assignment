import { responseData} from "../../utils/OtherFunctions.js";
import Role from "../../model/roleModel/roleModel.js";



const getRole = async(req,res) =>{
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;
    try{
      

        const total = await Role.countDocuments();
        const totalPages = Math.ceil(total / itemsPerPage);
        const skip = (page - 1) * itemsPerPage;
        const data = await Role.find()
          .skip(skip)
          .limit(itemsPerPage);
          const response ={
            meta: {
            total,
            pages: totalPages,
            page,
          },
          data

          }
    
          responseData(res, "Get ROle Data Successfully!",200,true,"", response);


    }
    catch(err)
    {
        responseData(res, "", 500, false, "Internal Server Error!",err)
        console.log(err);
    }

}
export default getRole;