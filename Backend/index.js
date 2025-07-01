const express=require('express');
const http=require('http');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const {dbConnect}=require("./config/database");
const {cloudinaryConnect}=require("./config/cloudinary");
const Class=require("./models/Class");
const app=express();
require('dotenv').config();
const authRoute=require("./routes/authRoute");
const profileRoute=require("./routes/profileRoute");
const courseRoute=require("./routes/courseRoute");
const myRoutes=require("./routes/myroutes");
//other routes
const otherRoutes=require("./routes/otherRoute");
const fileUpload=require("express-fileupload");

const allowedOrigins = [
  "http://localhost:3000",
   process.env.FRONTEND_URL,
   `${process.env.FRONTEND_URL}/`
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({useTempFiles:true,tempFileDir:'/tmp/'} ));

dbConnect();
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/doubt",myRoutes);
app.use("/api/v1/other",otherRoutes);

app.get("/",(req,res)=>{
    return res.send("Welcome to my backend Page");
});


//  Start the Server
const PORT = process.env.BACKEND_PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running successfully on port: ${PORT}`);
});

// 
app.post("/api/v1/create-class",async (req,res)=>{
    try{
        const {grade}=req.body;
        const classDb=await Class.create({grade:grade});
    }
    catch(err){
        console.log(err);
    }
})


const CalenderModel=require('./models/Calender')
const Blogmodel=require('./models/Blog')
const TestModel=require('./models/Test')
const testScoreModel=require('./models/TestScore')
const MeetingModel=require('./models/Meeting');
const paymentModel=require('./models/paymentreceipt')




const Razorpay = require("razorpay");
const crypto = require("crypto");
const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;
const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

// Fetch All Blogs
app.get("/blog", async (req, resp) => {
  try {
    const data = await Blogmodel.find({});
    resp.send(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Checkout Route
app.post("/checkout", async (req, resp) => {
  try {
    const { studentId, studentName, studentClass, feeType, feeAmount, collegeId, mobileNumber } = req.body;
    
    if(!studentId||!studentName||!studentClass||!feeType||!feeAmount||!collegeId||!mobileNumber){
        return resp.status(500).json({
            success:false,
            message:"All fields are not available"
        })
    }
    var options = {
      amount: feeAmount * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    instance.orders.create(options, async function (err, order) {
      if (err) {
        console.error("Error creating order:", err);
        return resp.status(500).json({ success: false, message: "Payment failed" });
      }

      try {
        await paymentModel.create({
          studentId,
          studentName,
          studentClass,
          feeType,
          feeAmount,
          collegeId,
          mobileNumber,
          paymentid: order.razorpay_payment_id,
        });
        resp.send(order);
      } catch (dbError) {
        console.error("Error saving payment:", dbError);
        resp.status(500).json({ success: false, message: "Database Error" });
      }
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Payment Verification
app.post("/paymentverification", async (req, resp) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_SECRET_KEY).update(body.toString()).digest("hex");

    if (expectedSignature === razorpay_signature) {
      return resp.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {
      return resp.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Get Razorpay API Key
app.get("/getkey", (req, resp) => {
  try {
    resp.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.error("Error fetching Razorpay key:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Payment Details
app.get("/paymentdetails/:pid", async (req, resp) => {
  try {
    const id = req.params.pid;
    const data = await paymentModel.find({ studentId: id });

    if (!data) {
      return resp.status(404).json({ success: false, message: "No payment details found" });
    }

    resp.send(data);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Fetch Calendar Data
app.get("/calender", async (req, resp) => {
  try {
    const data = await CalenderModel.find({});
    resp.send(data);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Fetch Test Questions
app.get("/testquestion", async (req, resp) => {
  try {
    const data = await TestModel.find({});
    resp.send(data);
  } catch (error) {
    console.error("Error fetching test questions:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Save Quiz Result
app.post("/quizresult", async (req, resp) => {
  try {
    const response = new testScoreModel(req.body);
    await response.save();
    resp.send({ status: true });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//  Fetch Student Score
app.get("/getscore/:studentid", async (req, resp) => {
  try {
    const studentid = req.params.studentid;
    const data = await testScoreModel.find({ Studentid: studentid });

    if (!data) {
      return resp.status(404).json({ success: false, message: "No score found" });
    }

    resp.send(data);
  } catch (error) {
    console.error("Error fetching score:", error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


//  Handle Uncaught Errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
    

// ==========================================================
// app.post("/api/v1/addrole",async (req,res)=>{
//     try{
//         const {grade,rollnumber}=req.body;
//         const classDb=await Class.findOneAndUpdate({grade:grade},{$push:{rollnumber:rollnumber}});
//         return res.status(200).json({
//             message:"Updated successfully",
//         })
//     }
//     catch(err){
//         console.log(err);
//     }
// })
// 
// ========================
// const socketIO = require('./socketio'); // Import the socket.js file
// socketIO.initSocket(server);

// ===============================================
// room createion


// app.get("/hi",(req,resp)=>{
//     resp.send({message:"gello"})
// })
// const chatModel=require("./models/Model");
// const roomModel=require("./models/ModelCreateRoom");
// const {uploadImageToCloudinary}=require("./utils/imageUploader");
// app.get("/roomcreate/:roomname",async(req,resp)=>{
//     const roomname=req.params.roomname;
//     let data=await roomModel.find({room:roomname});
//     if(data.length>0){
//           return resp.send({status:false,
//           message:"Same Room Name already exist"});
//     }
    
//     const roommodel=new roomModel({room:roomname});
//     data=await roommodel.save();
//     console.log(data);
//     // resp.send(data);
//     resp.send({status:true,
//     message:"room created "});
//     })
//     app.get("/rooms",async(req,resp)=>{
//     const roommodel=await roomModel.find({});
//     resp.send(roommodel);
//     })
//     app.get('/getchat/:room',async(req,resp)=>{
//           try {
//                 console.log("accessing chat of room ",req.params.room);
//                 const messages = await chatModel.find({room:req.params.room}); 
//                 const frontendData = messages.map(item => ({ ...item._doc, _id: item._id.toString() }));      
//                 resp.send(frontendData);
//                 } catch (error) {
//                 resp.status(500).send({ error: 'Internal Server Error' });
//           }
//     });

//     const storage=multer.diskStorage({
//         destination:(req,file,cb)=>{
//         cb(null,'Images');
//         },
//         filename:(req,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname))
//         }
//   });
//   const upload=multer({storage:storage});

// console.log( "Hello",process.env.FRONTEND_PORT ) 

//   app.post("/upload",async(req,resp)=>{
//     console.log("file uploading",req.files.image)
//         const  file=req.files.image;
//         const cdResponse= await uploadImageToCloudinary(file,"menty");
//         const imageurl=cdResponse.secure_url;
//         const replyingto=req.body.replyingto==="null"?null:req.body.replyingto;
//         const replyingmsg=req.body.replyingmsg==="null"?null:req.body.replyingmsg;
//         const chat={
//               msgtype:req.body.msgtype,
//               imagename:imageurl,
//               user:req.body.user,
//               message:req.body.message,
//               room:req.body.room,
//               replyingto:replyingto,
//               replyingmsg:replyingmsg,
//               chatID:Date.now()+req.body.user
//         }
  
//         const data= new chatModel(chat);
//         data.save();
//         // io.to(req.body.room).emit("message", chat);
//         socketIO.emitMessage(req.body.room,chat);
//         resp.send({message:"data send",status:true});
//   })
// // ===============================================








   