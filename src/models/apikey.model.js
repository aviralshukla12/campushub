import mongoose  from "mongoose";

const apikeySchema = new  mongoose.Schema(
    {
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref :"User",
            required : true
        },

        key:{
            type:String,
            required: true,
            unique:true,
        },
        active:{
            type: Boolean,
            default: true,
        }
    },
    {timestamps : true}
);

export default mongoose.model("Apikey", apikeySchema);