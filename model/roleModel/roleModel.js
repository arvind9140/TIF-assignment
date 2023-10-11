import mongoose from "mongoose";


const RoleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },



})
export default mongoose.model("Role", RoleSchema, "Role");