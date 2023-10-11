import { responseData} from "../../utils/OtherFunctions.js";
import Community from "../../model/communityModel/communityModel.js";


const getallCommunity = async(req,res) =>{
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;
    try{
let data =[]
        const total = await Community.countDocuments();
        const totalPages = Math.ceil(total / itemsPerPage);
        const skip = (page - 1) * itemsPerPage;
        const Data = await Community.find().skip(skip) .limit(itemsPerPage)
        for(let i =0;i<Data.length;i++)
        {
            
                data.push({
                    id:Data[i]._id,
                    name :Data[i].name,
                    slug:Data[i].slug,
                    owner:{
                    id:Data[i].owner,
                    name:Data[i].memberData[0].name
                },
                created_at:Data[i].created_at,
                updated_at:Data[i].updated_at

                })  
        }
       
        

          const response ={
            meta: {
            total,
            pages: totalPages,
            page,
          },
          data

          }
    
          responseData(res, "Get Role Data Successfully!",200,true,"", response);



    }
    catch(err)
    {
        responseData(res, "", 500, false, "Internal Server Error!",err)
        console.log(err);
    }







}
export default getallCommunity;