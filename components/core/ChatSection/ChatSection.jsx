import SideBar from "./SideBar";
import RightPage from "./RightPage";
import "./chatSection.css";
function ChatSection(){
    return(
        <div className="App">
            <SideBar/>
            <RightPage/>
        </div>
    )
};
export default ChatSection;