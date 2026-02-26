import mongoose  from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title :{
            type: String,
            required: true
        },
        description : String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required:trusted
        }
    },
    {timestamps : true}
);
export default mongoose.model("Course" , courseSchema);