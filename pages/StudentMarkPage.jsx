import { useState, useEffect, useMemo } from 'react';
import { Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import React from "react";

const Skeleton = ({ width = "100%", height = "20px", className = "" }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded-md ${className}`}
      style={{ width, height }}
    ></div>
  );
};

function StudentMarkPage() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const { grade, rollnumber } = useSelector((state) => state.auth);
  const [allData, setAllData] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);
  const [examNames, setExamNames] = useState([]);
  const [graphData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examLoading, setExamLoading] = useState(true);
  const [subjectLoading, setSubjectLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [targetSubject, setTargetSubject] = useState("");

  useEffect(() => {
    async function fetchExams() {
      try {
        setExamLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-exam-by-grade`, { grade });
        const data = response?.data?.ExamDb;
        setAllData(data);
        setExamNames([...new Set(data.map((ele) => ele.examName))]);
        setExamLoading(false);
      } catch (err) {
        toast.error("Error in getting class details");
        console.error(err);
      } finally {
        setExamLoading(false);
      }
    }
    fetchExams();
  }, [grade]);

  function selectExam(examType) {
    setSelectedExam(examType);
    setSubjectLoading(true);
    setData(null);
    setTimeout(() => {
      setSubjectIds(allData.filter((ele) => ele.examName === examType));
      setSubjectLoading(false);
    }, 500);
  }

  function selectSubject(id, subjectName) {
    setTargetSubject(subjectName);
    const subjectData = allData.find((ele) => ele._id === id)?.marksRecord || [];
    calculateValues(subjectData);
  }

  function calculateValues(temp) {
    let maxMark = 0, studentMark = 0, totalMarks = 0;
    if(!temp||temp.length==0){
        setData(null);
        return;
    }
    temp.forEach((ele) => {
      let mark=parseFloat(ele.marks);
        // maxMark = Math.max(maxMark,mark);
        if(maxMark<mark){
            maxMark=mark;
        }
      if (mark >= 0) totalMarks += mark;
      if (ele.rollNumber === parseInt(rollnumber,10)) studentMark = mark;
    });
    let averageMark=totalMarks / (temp.length || 1)
    setData({ maxMark, studentMark, averageMark:averageMark});
  }

  return (
    <div className="mt-10 flex flex-col md:flex-row items-center md:items-start md:justify-center px-4 md:px-8 min-h-screen gap-4">
      <div className='w-full md:w-1/2'>
      <div className="w-full max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Select Exam Type</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {examLoading
            ? [...Array(3)].map((_, i) => <Skeleton key={i} width={120} height={50} />)
            : examNames.map((exam, idx) => (
                <button
                  key={idx}
                  onClick={() => selectExam(exam)}
                  className={`min-w-[150px] px-4 py-2 rounded-md ${selectedExam==exam?"bg-blue-800" :"bg-blue-400"} text-white text-lg  transition`}
                >
                  {exam}
                </button>
              ))}
        </div>
      </div>

      {selectedExam && (
        <div className="w-full max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">Select the Subject</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {subjectLoading
              ? [...Array(3)].map((_, i) => <Skeleton key={i} width={120} height={50} />)
              : subjectIds.map((ele, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSubject(ele._id, ele.SubjectId?.subjectName)}
                    className={`min-w-[150px] px-4 py-2 rounded-md ${(targetSubject===ele.SubjectId.subjectName)?"bg-green-800":"bg-green-500"}  text-white text-lg  transition`}
                  >
                    {ele.SubjectId?.subjectName}
                  </button>
                ))}
          </div>
        </div>
      )}
     </div>
     <div className="w-full min-h-[420px] md:w-1/2 max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white">
            {!graphData ?(<div className='w-full h-full flex flex-col gap-3'>{[...Array(3)].map((_, i) => <Skeleton key={i} width={400} height={100} />)}</div>):
            (
                <div className="w-full">
                <h2 className="text-2xl font-bold text-center mb-4">Marks Overview</h2>
                <div className="w-full h-80">
                    <Bar
                    data={{
                        labels: ["Your Marks", "Class Average", "Highest Mark"],
                        datasets: [
                        {
                            label: "Marks",
                            data: [graphData.studentMark, graphData.averageMark, graphData.maxMark],
                            backgroundColor: [
                            "rgba(43, 63, 229, 0.8)",
                            "rgba(250, 192, 19, 0.8)",
                            "rgba(253, 135, 135, 0.8)",
                            ],
                            borderRadius: 5,
                        },
                        ],
                    }}
                    />
                </div>
                </div>
            )}
      </div>
    </div>
  );
}

export default StudentMarkPage;