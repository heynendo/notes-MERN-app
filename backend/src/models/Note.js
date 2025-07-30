import mongoose from "mongoose"

//1. create schema
const noteSchema = new mongoose.Schema({
    title: { type:String, required:true },
    content: { type:String, required:true },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
},
{timestamps: true} //adds createdAt, updatedAt variables
)
//2. create model based off schema
const Note = mongoose.model("Note", noteSchema)

export default Note