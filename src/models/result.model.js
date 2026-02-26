import mongoose from  mongoose;

const resultSchema = new mongoose.Schema(
    {
        student:{
             type: mongoose.Schema.Types.ObjectId,
             ref : "User",
             required:true
        },

        subject :{
            type:String,
            required:true
        },
        marks:{
            type:Number,
            required:true
        },
        publishedBy: {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        }
    },
    {timestamps: true}
);

export default mongoose.model("Result" , resultSchema)