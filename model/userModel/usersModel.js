import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        minlength: 2,
      },

    password: {
        type: String,
        required: true,
        minlength: 6,
      },

    email: {
        type: String,
        required: true,
      },
      status:{
        type:Boolean,
        required:true,
      },
      token:{
        type:String,

      },


    createdAt: {
        type: Date,
        default: Date.now,
      },


})
export default mongoose.model("users", userSchema, "users");