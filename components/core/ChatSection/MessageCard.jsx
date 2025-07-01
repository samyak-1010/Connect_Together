import React,{useContext,useRef} from 'react'
import {AppContext} from '../../../Context/AppContextProvider'
import { Link, Element } from 'react-scroll';
import { useSelector } from 'react-redux';
const MessageCard = ({data}) => {
const {user}=useSelector((state)=>state.profile);
const name=user?.firstName+user?.lastName;

const {userId,replyingTo,setReplyingTo,replyingmsg,setReplyingMessage}=useContext(AppContext);
const myobj=useRef();


const highLightDiv=(replyingto,event)=>{
document.getElementById(replyingto).classList.add('selected');
}


const url=data.imagename;
const replyHandle=(e)=>{
  e.preventDefault();
  e.stopPropagation();
    document.querySelectorAll('.send-message, .received-message').forEach(element => {
    if (element !== myobj.current) {
      element.classList.remove('selected');
    }
  });


  if (myobj.current.classList.contains('selected')) {
    myobj.current.classList.remove('selected');
    setReplyingTo(null);
    setReplyingMessage(null);
  } else {
    myobj.current.classList.add('selected');
    setReplyingTo(data.chatID);
    setReplyingMessage(data.message);
  }
}




const replytextimg=data.replyingmsg || "IMAGE"
if (data.msgtype === "image") 
{
// handling msg image


if(userId===data.user)
{
  return (
  <div className='send-message' onClick={replyHandle} ref={myobj} name={data.chatId} id={data.chatID}>
    <div className='userinmsg'>{"@"+data.user}</div>
     {data.replyingto &&
        
        <Link to={data.replyingto} spy={true} smooth={true}   offset={-150}  containerId="yourContainerId" onClick={()=>highLightDiv(data.replyingto)}><div className='repliddiv'>{replytextimg}</div></Link>
      }
    <Element  name={data.chatID} className="element" ></Element>
    
    <div className='imagediv'><img src={url} className='imageChat' alt='Chat Image'/></div>
  </div >
)}

else {
  return (
    <div className='received-message' onClick={replyHandle} ref={myobj}  name={data.chatID} id={data.chatID}>
            <div className='userinmsg'>{"@"+data.userr}</div>
             {data.replyingto &&
        
        <Link to={data.replyingto} spy={true} smooth={true}   offset={-150}  containerId="yourContainerId" onClick={()=>highLightDiv(data.replyingto)}><div className='repliddiv'>{replytextimg}</div></Link>
      }
      <Element  name={data.chatID} className="element" ></Element>
      <div className='imagediv'><img src={url} className='imageChat' alt='Chat Image'/></div>
    </div>
  )
}





}
else {
// handiling message in text
  if(userId===data.user)
  {return (
    <div className='send-message' onClick={replyHandle} ref={myobj} name={data.chatId} id={data.chatID}>
      <div className='userinmsg'>{"@"+data.user}</div>
       {data.replyingto &&
          <Link to={data.replyingto} spy={true} smooth={true}   offset={-150}  containerId="yourContainerId" onClick={()=>highLightDiv(data.replyingto)}><div className='repliddiv'>{replytextimg}</div></Link>
        }
      <Element  name={data.chatID} className="element" ></Element>
      
      <div className='actualmessage'>{data.message}</div>
    </div >
  )}

  else {
    return (
      <div className='received-message' onClick={replyHandle} ref={myobj}  name={data.chatID} id={data.chatID}>
        <div className='userinmsg'>{"@"+data.user}</div>
               {data.replyingto &&
          
          <Link to={data.replyingto} spy={true} smooth={true}   offset={-150}  containerId="yourContainerId" onClick={()=>highLightDiv(data.replyingto)}><div className='repliddiv'>{replytextimg}</div></Link>
        }
        <Element  name={data.chatID} className="element" ></Element>
        <div className='actualmessage'>{data.message}</div>
      </div>
    )
  }




}

}



export default MessageCard



// return (
//   <div className='imagediv received-message'><img src={url} className='imageChat' alt='Chat Image'/></div>
// );