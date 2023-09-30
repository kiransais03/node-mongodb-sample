const Mongooose = require('mongoose');
const Schema = Mongooose.Schema;  

//Creating an object schema or model or Blueprint that needs to be stored in Database.
//It is not compulsory but we need to do it

const Todo = new Schema ({
    text :{
        type : String,
        require : false,
    },
    isCompleted : {
        type: Boolean,
        require : true
    },
    dataTime : {
        type:Date,
        default : Date.now(),
        require : true,
    }

})

module.exports = Mongooose.model("todo-data1",Todo)  //Connecting this schema to database document in which the data need to be added.
