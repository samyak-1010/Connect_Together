const mongoose=require("mongoose");
const {mailSender}=require("../utils/mailSender");

const OTPSchema=new mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true
    },
    otp: {
        type:Number,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:5*60
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailSendResponse=await mailSender(email,"Verification code from StudyNotion",otp);
        // console.log(mailSendResponse);
    }catch(error){
        console.log("Error occured while sending mail: ",error);
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports=mongoose.model("OTP",OTPSchema);