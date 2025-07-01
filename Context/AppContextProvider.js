import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client"; // Not needed

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [notification, setNotification] = useState([]);
  const [roomId, setRoomId] = useState("room1");
  const [allMessage, setAllMessage] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const [currentDoubt, setCurrentDoubt] = useState();

  const url = `${process.env.REACT_APP_BACKEND_URL}/`;

  // Dummy socket to avoid errors
  const dummySocket = {
    emit: () => {}, // No-op function
    on: () => {}, // No-op function
    disconnect: () => {}, // No-op function
  };

  const [socket, setSocket] = useState(dummySocket); // Always defined

  useEffect(() => {
    console.log("Dummy socket initialized");
    setSocket(dummySocket);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}getchat/${roomId}`);
      const data = await response.json();
      setAllMessage(data);
    } catch (err) {
      console.error("Error fetching chat data:", err);
    }
  };

  const username = user?.firstName + user?.lastName;

  useEffect(() => {
    // fetchData();
    socket.emit("join-room", roomId); // No crash even if backend is down
  }, [roomId, socket]);

  const value = {
    socket,
    notification,
    setNotification,
    currentDoubt,
    setCurrentDoubt,
    url,
    roomId,
    setRoomId,
    allMessage,
    setAllMessage,
    userId: username,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
