const Homework=require("../models/Homework");
const HomeworkReview =require("../models/HomeworkStudent");
const createHomework = async (req, res) => {
    const { subjectName, grade, question, date } = req.body;
    try {
      const newHomework = new Homework({ subjectName, grade, question, date });
      await newHomework.save();
      res.status(201).json(newHomework);
    } catch (error) {
      console.log("Error in creating homework",err.message);
      res.status(500).json({ message: error.message });
    }
  };
const getHomeworkByDateAndGrade = async (req, res) => {
  const { date, grade } = req.body;
  try {
    const homework = await Homework.find({ date, grade }).populate('subjectName');
    // console.log(homework);
    res.json(homework);
  } catch (error) {
    console.log("Error in get homework",err.message);
    res.status(500).json({ message: error.message });
  }
};
 const addReviewToStudent=async (req,res)=>{
  try{
    const {rollnumber,review,date}=req.body;
    // console.log(rollnumber,review,date);
    if(!rollnumber||!review||!date){
      return res.status(400).json({
        success:false,
        message:"Complete all fileds",
      })
    }
      const dbResponse=await HomeworkReview.create({rollnumber:rollnumber,date:date,review:review});
      return res.status(200).json({
        success:true,
        dbResponse,
      })
  }catch(err){
    console.log("Error in homework review",err);
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
 }

const fetchHomeWorkReview=async (req,res)=>{
  try{
    const {rollnumber,date}=req.body;
    // console.log(rollnumber,date);
    if(!rollnumber||!date){
      return res.status(400).json({
        success:false,
        message:"Complete all fileds",
      })
    }
      const dbResponse=await HomeworkReview.find({rollnumber:rollnumber,date:date});
      return res.status(200).json({
        success:true,
        dbResponse,
      })
  }catch(err){
    console.log("Error in fetching homework review",err.message);
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
 }
module.exports = {
  getHomeworkByDateAndGrade,createHomework,addReviewToStudent,fetchHomeWorkReview
};
