import React, { useContext, useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppContext } from '../Context/AppContextProvider'


const LiveStream = () => {
    const {user}=useSelector((state)=>state.profile);
   const {socket,currentDoubt}=useContext(AppContext);
    const navigate=useNavigate();
    const {id}=useParams();

  useEffect(()=>{
    const data={
      studentId:currentDoubt?.studentId,
      roomId:id
    }
    console.log(data);
    console.log(currentDoubt);
socket.emit("videogenerated",data);
console.log("notification send to student ")
  },[]);
    const myMeeting=async (element)=>{
        const appId=1172215896;
        const serverSecret="d6648538db2eaaedfd3e4bbaa438b083";
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            id,
            Date.now().toString(),
            user.firstName
        );
        const zp=ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container:element,
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showRoomTimer:true,
            onLeaveRoom:()=>{navigate("/")},
            screenSharingConfig: {
              width: 200,
              height: 200,
            } 

        })
    }

  return (
    <div className='zoomCall'>
      <div ref={myMeeting} className='meetingDiv'/>
    </div>
  )
}

export default LiveStream
