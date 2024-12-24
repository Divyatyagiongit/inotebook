const mongoose = require('mongoose')
const {Schema} = mongoose;
    
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    _id:{
        type:mongoose.Schema.Types.ObjectId,
    },
     
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        Default:"General"    
    },
    timeStamp:{
        type:Date,
        Default:Date.now
    }

});

const Notes = mongoose.model('notes',NotesSchema);
module.exports = Notes