const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model.js')
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.set('view engine','ejs');

const PORT = 8000;
const connectDB = async() => {
    try{
       const conn = await mongoose.connect('mongodb://127.0.0.1/student');
       console.log('Mongodb connected successfully');
    }catch(err){
        console.log('Failed to connect to the database');
        console.log(err.message);
        process.exit();
    }
}
connectDB();

app.get('/', async(req,res) => {
      res.render('index');
});

// Creating new student
app.post('/addStudent', async(req,res) => {
    try{
        const stud = await new Student(req.body);
        stud.save();
        res.send('Successfully added to the database');
    }catch(err){
        console.log(err.message);
    }
})
// Getting list of all students
app.get('/getStudent',async(req,res) => {
    try{
        const stud = await Student.find({});
        const count = await Student.count();
        res.render('table',{count: count,student: stud});
    }catch(err){
        console.log(err.message);
    }
})
// List of students who got DSBDA marks greater than 10
app.get('/dsbda',async(req,res) => {
    try{
        const stud = await Student.find({DSBDA_Marks: {$gt: 10}});
        const count = await Student.count();
        res.render('table',{count: count,student: stud});
    }catch(err){
        console.log(err.message);
    }
})
// Deleting student by id
app.post('/delete/:id',async(req,res) => {
    try{
        const stud = await Student.findByIdAndDelete(req.params.id);
        res.redirect('/getStudent');
    }catch(err){
        console.log(err.message);
    }
})
// Updating student by id

app.post('/update/:id',async(req,res) => {
    try{
        const stud = await Student.findByIdAndUpdate(req.params.id,{DSBDA_Marks: 6});
        res.redirect('/getStudent');
    }catch(err){
        console.log(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`server is successfully running on port ${PORT}`);
})