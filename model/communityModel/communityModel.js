import mongoose from "mongoose";

const CommunitySchema =  new mongoose.Schema({
    name: {
         type : String,
          required : true
         },
         slug: {
            type : String,
             required : true
            },
            owner:{
                type : String,
            },
            memberData:{
                type:Array
            },
            created_at: {
                type: Date,
                default: Date.now,
              },
              updated_at: {
                type: Date,
                default: Date.now,
              },

})
export default mongoose.model("community", CommunitySchema, "community");