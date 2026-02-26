import mongoose, { modelNames }  from "mongoose";   

const announcementSchema =  new mongoose.Schema(
    {
        tittle: {type: String , required : true},
        content :{type:String , required : true},

        postedBy :{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required :  true
        }
    },
    {timestamps : true}
);

export default  mongoose.model("Annoucement" , announcementSchema);