import mongoose from "mongoose";

const RequirmentSchemaofHackthon = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hackthonName:{
       type:String,
       require:true
    },
    hackthonProblemCategory:{
      type:String,
      require:true
    },
    hackthonProblemStatement:{
        type:String,
        require:true
    },
    hackthonProjectIdea:{
        type:String,
        require:true
    },
    hackthonWebsiteLink:{
        type:String,
    },
    AllTechStack:{
        type:Array,
        require:true
    },
    RequiredSkills:{
        type:Array,
        require:true
    }, 
})
const RequirmentHackthon = mongoose.model("RequirmentHackthon", RequirmentSchemaofHackthon);
export default RequirmentHackthon;