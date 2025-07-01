import React,{useContext, useEffect, useState,useRef} from 'react'
import {AppContext} from '../../../Context/AppContextProvider';
import toast from 'react-hot-toast';
import { MdForum } from "react-icons/md";
import RoomCard from './RoomCard'
const SideBar = () => {
  const [allRooms,setallRooms]=useState();
  const [roomName,setRoomName]=useState();
  const myObj=useRef();
const {url}=useContext(AppContext);
  const fetchData=async()=>{
    try{
  const response=await fetch(`${url}rooms/`);
  const data =await response.json();
  console.log(data);
  setallRooms(data);
    }catch(err){
      console.log(err);
    }
  } 

useEffect(()=>{
  fetchData();
},[])

const roomCreateHandle=async(e)=>{
  console.log("romm function creation calleld");
  e.preventDefault();
  if(!roomName){
     return toast.error("Enter Room Name")
  }
  
  const response=await fetch(`${url}roomcreate/${roomName}`);
  const data=await response.json();
  if(data.status===false){
    toast.error(data.message);
  }
  else{
    toast.success(data.message);
  }
  setRoomName("");
}

const {theme,roomId,setRoomId,socket} = useContext(AppContext);


return (
  <div className='SideBar'>
    <div className='sideheader'>
      <div className='firstheader'>
      Chat Forum <MdForum></MdForum>
      </div>
      <div className='secondheader'>
      <input name='roomname' value={roomName} onChange={(e)=>{setRoomName(e.target.value)}}></input>
      <button className='createRoomBtn' onClick={roomCreateHandle}>Create</button>
      </div>
      {/* <div className='secondheader'>
      <input name='username' value={userId} onChange={(e)=>{setUserID(e.target.value)}}></input>
      </div> */}

    </div>
    <div className='roomcontainer'>
    {allRooms &&
      allRooms.map((data)=>(<RoomCard data={data}></RoomCard>))
    }
    </div>
  </div>
)
}
export default SideBar