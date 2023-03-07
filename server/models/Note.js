

const mongoose = require('mongoose');

const { Schema }= mongoose;    

const NoteSchema = new Schema({

   user:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'user'

   },
   
    title: {

        type: String,
        required: true
    },

    description: {

        type: String,
        required: true
    },

    tag: {
        type: String,
        default:"General"

    },
    date: {
        type: Date,
        default: Date.now
    }


});


//we are giving mode first parameter as model name and second parameter is the schema we have

module.exports = mongoose.model("notes", NoteSchema);