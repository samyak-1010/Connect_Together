// import React from 'react'
import { useSelector } from 'react-redux';
import {useEffect,useState,useContext,useRef} from 'react'
import {AppContext} from '../../../Context/AppContextProvider';
// import { io } from 'socket.io-client';
import toast from 'react-hot-toast'
import MessageCard from './MessageCard'
// =================================


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// =================================




const RightPage = () => {
      const {user}=useSelector((state)=>state.profile);
      const name=user?.firstName+user?.lastName;
      const {roomId,url,socket,setUserID,userId,setAllMessage,allMessage,replyingTo,replyingmsg}=useContext(AppContext);
      const [connsectionStatus,setConnetctionStatus]=useState("not connected");
      const [sendMessage,setSendMessage]=useState("");
      const [receiveMessage,setReceiveMessage]=useState("");
      const [isMessage,setIsMessage]=useState(false);
      const [file,setFile]=useState("");
// ===================================
// =================================
const fileInputRef = useRef(null);

const handleFileUpload = () => {
      fileInputRef.current.click();
};




// =================================
// =================file handling

const triggerFileInputComponent=()=>{
      fileInputRef.current.click();
}
const handleFileChange=(e)=>{
      setFile(e.target.files[0]);
}
const imageUploadHandle=async(e)=>{
      e.preventDefault();
      if(!file){
            return toast.error("add some file");
      }
      console.log("image successfully uploaded",replyingTo,replyingmsg)
      const formData= new FormData();
      formData.append("msgtype","image");
      formData.append("room",roomId);
      formData.append("user",name);
      formData.append("replyingto",replyingTo);
      formData.append("message",sendMessage);
      formData.append("replyingmsg",replyingmsg);
      formData.append("image",file);
      const response = await fetch(`${url}upload`, {
            method: "POST",
            body: formData
            });
            const data=await response.json();
            if(data.status==true){
                  return toast("image successfully uploaded")
            }
            else {
                  return toast("some error occurred");
            }
            setFile("");
}


const objDiv = useRef(null);
useEffect(() => {
      // Accessing the DOM node using the ref
      console.log(objDiv.current);
      console.log(objDiv.current.scrollHeight);
      if (objDiv.current) {
      objDiv.current.scrollTop = objDiv.current.scrollHeight;
      }
    },[]);



// ===================================



      useEffect(()=>{

            socket.on("message1",(data)=>{
                  console.log("testing",data);
            })
      socket.on("msg",(msg)=>{
      console.log(msg);
      setConnetctionStatus(receiveMessage + msg?.message);
      })
      socket.on("message",(msg)=>{
      console.log("msg from backend by socket io",msg)
      setAllMessage((preMessage)=>[...preMessage,msg])
      })
      },[])

useEffect(() => {
      if (objDiv.current) {
        objDiv.current.scrollTop = objDiv.current.scrollHeight;
      }
    }, [allMessage]);


const sendMessageHandle=(e)=>{
        e.preventDefault();
        if(!sendMessage){
            return toast.error("add some message");
        }
        console.log("messaging sending to",roomId,"by ",name);
        const objecttosend={
            msgtype:"text",
            room:roomId,
            user:name,
            replyingto:replyingTo,
            message:sendMessage,
            replyingmsg:replyingmsg}
            socket.emit("clientMessage",objecttosend);
            console.log("data send is ",objecttosend);
            setSendMessage("");
}





return (
      <div className="RightPage">
                  <div className='msgcontainer'  >
                        <div className='ms'>You Are In  : {roomId}</div>
                        <div className='sendandreceivemsg' id="yourContainerId" ref={objDiv}>
                        {allMessage &&
                              allMessage.map((data,index)=>(
                                    <MessageCard data={data} key={index}></MessageCard>)
                              )
                        }
                        </div>
                  </div>
      
      
                  <div className='sendmessage'>
      {/* =====================text sending section======================= */}
            <div className='textsendingsection'>
                  <input value={sendMessage} onChange={(e)=>{setSendMessage(e.target.value); console.log("hello ");}}></input>
                  <button onClick={sendMessageHandle}>sendmessage</button>
            </div>
      {/* ====================file uploading section======================== */}
            <div className='fileuploadingsection'>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={triggerFileInputComponent}>
              <FontAwesomeIcon icon={faUpload} /> 
            </button>
            <button onClick={imageUploadHandle}>uploadimage</button>
            </div>
      </div>
      
      
      </div>
              );
      }
      

export default RightPage