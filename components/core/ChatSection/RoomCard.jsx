import React,{useContext, useRef} from 'react'
import {AppContext} from '../../../Context/AppContextProvider';
const RoomCard = ({data}) => {
const myObj=useRef();
const {roomid,setRoomId}=useContext(AppContext);
const RoomHandle=(roomid,event)=>{
            // console.log(theme);
            console.log("room mhandle funcrion ",roomid)
            setRoomId(roomid);
            document.querySelectorAll('.roomName').forEach((element)=>{
              element.classList.remove('activeRoom');
            });
            myObj.current.classList.add('activeRoom');
}



return (
  <div  className='roomName' onClick={()=>{RoomHandle(data.room)}} ref={myObj}> 
  <img  className='groupicon' src="https://th.bing.com/th?id=OIP.I4pHGGuvOfwcpKd3ZMW6lwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"></img>
    <div className="roomnamediv">{data.room}</div>
    </div>
)
}

export default RoomCard
