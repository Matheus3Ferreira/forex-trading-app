import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:3000/test");
mongoose.Promise = global.Promise;

export default mongoose;