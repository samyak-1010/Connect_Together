import React, { useEffect, useState } from 'react';
import diary from '../assets/diary.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast'
function Skeleton() {
    return (
        <div className="flex flex-col gap-4 p-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-[300px] h-[50px] bg-gray-300 rounded-sm animate-pulse"></div>
            ))}
        </div>
    );
}

const MyDiary = () => {
    const { grade, rollnumber } = useSelector((state) => state.auth);
    const [date, setDate] = useState(new Date());
    const [homeworkDet, setHomeworkDet] = useState(null);
    const [homeworkReview, setHomeworkReview] = useState(null);
    const [activeTab, setActiveTab] = useState("homework"); // Default tab is 'homework'

    const onChange = (newDate) => setDate(newDate);
    
    const dateMatch = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const fetchHomework = async () => {
        try {
            setHomeworkDet(null);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/other/homework`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grade, date: dateMatch }),
            });
            if (!response.ok) throw new Error('Failed to fetch homework');
            
            const result = await response.json();
            setHomeworkDet(result);
        } catch (error) {
            toast.error("Error in getting Homework")
            console.error('Error fetching homework:', error);
        }
    };

    const getHomeWorkReview = async () => {
        try {
            setHomeworkReview(null);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-homework-review`, {
                rollnumber,
                date: dateMatch,
            });
            setHomeworkReview(response?.data?.dbResponse);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHomework();
        getHomeWorkReview();
    }, [date]);

    return (
        <div className="myDiary min-h-[300px] max-w-screen mx-auto p-4">
            {/* Diary Header */}
            <div className="flex flex-col mb-4">
                <h1 className="text-2xl font-bold text-indigo-600">My Diary</h1>
                <img src={diary} className="w-32 h-32 object-cover rounded-lg" alt="Diary" />
            </div>

            {/* Tab Navigation */}
            <div className='w-11/12 flex flex-col md:flex-row'>
                <div className='flex flex-1 flex-col'>
                    <div className="flex justify-around bg-indigo-400 rounded-md p-2 mb-4">
                        <button
                            className={`text-lg font-semibold px-4 py-2 rounded transition-all ${
                                activeTab === 'homework' ? 'bg-indigo-600 text-white' : 'text-gray-700'
                            }`}
                            onClick={() => setActiveTab('homework')}
                        >
                            Homework
                        </button>
                        <button
                            className={`text-lg font-semibold px-4 py-2 rounded transition-all ${
                                activeTab === 'review' ? 'bg-indigo-600 text-white' : 'text-gray-700'
                            }`}
                            onClick={() => setActiveTab('review')}
                        >
                            Review
                        </button>
                    </div>

                    {/* Content Based on Active Tab */}
                    <div className="bg-white shadow-lg rounded-lg p-4 max-h-[300px] overflow-auto">
                        {activeTab === 'homework' ? (
                            !homeworkDet ? (
                                <Skeleton />
                            ) : homeworkDet.length > 0 ? (
                                homeworkDet.map((homework, index) => (
                                    <div key={index} className="border-b py-2">
                                        <h3 className="font-semibold text-indigo-600">{homework.subjectName.subjectName}</h3>
                                        <p className="text-gray-700">{homework.question}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg text-gray-800">No homework assigned for this date.</p>
                            )
                        ) : (
                            !homeworkReview ? (
                                <Skeleton />
                            ) : homeworkReview.length > 0 ? (
                                homeworkReview.map((review, index) => (
                                    <p key={index} className="text-lg text-gray-800 border-b py-2">{review.review}</p>
                                ))
                            ) : (
                                <p className="text-lg text-gray-800">No reviews available for this date.</p>
                            )
                        )}
                    </div>
                </div>
                {/* Calendar Section */}
                <Calendar onChange={onChange} value={date} />
            </div>
        </div>
    );
};

export default MyDiary;
