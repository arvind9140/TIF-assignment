import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes/roleRoutes.js";
import communityRoutes from "./routes/communityRoutes/communityRoutes.js";
import memberRoutes from "./routes/memberRoutes/memberRoutes.js"


mongoose.set("strictQuery", true);
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

dotenv.config();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongodb");
    } catch (error) {
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });
  
  app.use(cors());


  app.use("/v1/auth/", userRoutes);
  app.use('/v1/',roleRoutes, communityRoutes, memberRoutes);
  





  app.listen(8026, () => {
    connect();
    console.log("Connected to backend");
  });