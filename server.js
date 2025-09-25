const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require('path');

let app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,"./client/build")));
app.use('/profilePics', express.static(path.join(__dirname, 'profilePics')));


app.listen(3333,()=>{
    console.log("This port is listening to 3333");
});



let studentSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    gender:String,
    password:String,
    mobileNo:Number,
    profilePic:String
});

let student = new mongoose.model("student",studentSchema,"yadav");

 const storage = multer.diskStorage({
     destination: (req, file, cb) =>{
       console.log(file)
       cb(null, 'profilePics')
    },
    filename:  (req, file, cb)=>{
       cb(null, `${Date.now()}_${file.originalname }`)
   }
 })
const upload = multer({ storage: storage })

app.post("/login",upload.none(),async(req,res)=>{
  let userCred = await student.find().and([{email:req.body.email}])
  if (userCred.length >0) {
    if (userCred[0].password == req.body.password) {
        let dataToSend ={
             firstName:userCred[0].firstName,
             lastName:userCred[0].lastName,
             age:userCred[0].age,
             email:userCred[0].email,
             gender:userCred[0].gender,
             mobileNo:userCred[0].mobileNo,
             profilePic:userCred[0].profilePic
        }
        res.json({ status: "Success", msg: "password is valid",  data:dataToSend});
    } else {
        res.json({ status: "Failure", msg: "invalid password" });
    }
  } else {
        res.json({ status: "failure", msg: "user doesn't exist" });
  }
 
})

app.post("/signUp",upload.single("profilePic"),async(req,res)=>{
   console.log(req.body);
   console.log(req.file);
   let user = await student.find();
   res.json(user);
   try {
    let mystery = new student({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    email:req.body.email,
    gender:req.body.gender,
    password:req.body.password,
    mobileNo:req.body.mobileNo, 
    profilePic:req.file.path,
    
});
      await mystery.save();
      res.json({status:"success",msg:"data is inserted into mangodb"});
   } catch (error) {
      console.log(error)
      res.json({status:"failure",msg:"data is not inserted into mangodb"});
   }
   
});

app.get("*",(req,res)=>{
    res.sendFile("./client/build/index.html");
})



let connectedToMDB = async ()=>{
    try {
         await mongoose.connect("mongodb+srv://Nithin_75:nithin_75@batch250203.bljaajo.mongodb.net/shreya?retryWrites=true&w=majority&appName=Batch250203");
         console.log("connected to mangodb");
    } catch (error) {
        console.log("unable to connected to mangodb");
    }
}
connectedToMDB();