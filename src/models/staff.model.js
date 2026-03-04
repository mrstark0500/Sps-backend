const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name:{
        type :String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },
      email:{
        type:String,
        require:true
    },
      image:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    }
    
})

const staffModel = mongoose.model('staff',staffSchema);


module.exports= staffModel;



//  name: "Ms. Sabale Komal Sanjeev",
    // role: "Incharge HOD",
    // qualification: "B.Tech. (Computer Engg.)",
    // experience: "4 Years",
    // email: "72.komal.ks@gmail.com",
    // image: "/src/assets/staff/komal.jpg",