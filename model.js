const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    Name: {type: String,required: true},
    Roll_no: {type: Number, required: true},
    WAD_Marks: { type: Number, min: 0, max: 100 },
    CC_Marks: { type: Number, min: 0, max: 100 },
    DSBDA_Marks: { type: Number, min: 0, max: 100 },
    CNS_Marks: { type: Number, min: 0, max: 100 },
})

module.exports = mongoose.model('Student',StudentSchema);