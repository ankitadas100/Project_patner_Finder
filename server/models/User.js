import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    image_url:{
        type: String,
        require: true,
    },
    collagename: {
        type: String,
        require: true,
    },
    bio:{
        type:String,
        require:true
    },
    skill: {
        type: Array,
        require: true,
    },
    githublink:{
        type: String,
        require: true,
    },
    linkedinlink:{
        type: String,
        require: true,
    },
    protfolio:{
        types:String,
    },
    password:{
        type:String,
    }, 
},{ timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;