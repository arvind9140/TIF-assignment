import mongoose from "mongoose";

const MemberSchema =  new mongoose.Schema({
    communityId: {
         type : String,
          required : true
         },
            memberData:{
                type:Array
            },
            created_at: {
                type: Date,
                default: Date.now,
              },
             

})
export default mongoose.model("Members", MemberSchema, "Members");