const mongoose= require("mongoose");

const studentSchema = new mongoose.Schema({
    // A schema in Mongoose defines the structure of the documents(records) in a MongoDB collection.In this case, the schema is for a student.
    name:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
})

const students = new mongoose.model("student",studentSchema);
// The model is like a constructor function for creating new documents and interacting with the database.With this model, you can perform various operations such as saving new students, finding existing students, and updating or deleting student records

module.exports= students