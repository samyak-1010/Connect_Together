import React, { useState, useEffect, useContext,useMemo } from 'react';
import { useNavigate} from 'react-router';
import { AppContext } from '../Context/AppContextProvider';
import {toast} from 'react-hot-toast';
import { useSelector } from 'react-redux';


const NotificationPage = () => {
    
    const {notification,setNotification,socket,currentDoubt,setCurrentDoubt}=useContext(AppContext);
    const {user}=useSelector((state)=>state.profile);

    useMemo(()=>{socket.emit("join-room",user._id);
    console.log("room joined",user._id)},[]);
   useEffect(()=>{
   socket.on("askdoubt",(msg)=>{
     console.log("ask doubt",msg);
     setNotification((prev)=>[...prev,msg]);
   toast.success("All")
});
socket.on("instructorreached",(msg)=>{
  console.log("instructorreached",msg);
});
},[])
    
    const navigate=useNavigate();

    function clickHandler(notify){

        console.log("notify.studentId",notify)
        setCurrentDoubt(notify)
        const link=`/attend-question/${notify.doubtID}`;
        navigate(link);
    }



    return (
        <div className='notification customBoxShadow'>
            <h1 className='notificationHeading' >Notifications</h1>
            <div className='subCustomBoxShadow'>
            {
                notification.length===0?(<div>No notifications to display</div>):(<ul>
                    {notification.map((notify,index) => (
                        <li key={index} onClick={()=>{clickHandler(notify)}}>A notification from MENTY</li>
                    ))}
                </ul>)
            }
            </div>
        </div>
    );
}

export default NotificationPage


