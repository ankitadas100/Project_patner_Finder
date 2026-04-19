import mongoose from "mongoose";

const RequirmentSchemaofProject = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ProjectTitle:{
       type:String,
       require:true
    },
    ProjectDescription:{
      type:String,
      require:true
    },
    ProjectType:{
        type:String,
        require:true
    },
    ProjectStatus:{
        type:String,
        require:true
    },
    AllTechStack:{
        type:Array,
        require:true
    },
    RequiredSkills:{
        type:Array,
        require:true
    },  
    ProjectRepoLink:{
        type:String,
    },
})          
const RequirmentProject = mongoose.model("RequirmentProject", RequirmentSchemaofProject);
export default RequirmentProject;