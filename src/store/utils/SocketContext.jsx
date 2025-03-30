import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SocketContext = createContext();
const url = import.meta.env.VITE_API_URL;

export const SocketProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        const userId = Math.floor(Math.random() * 1000); // Generate a unique user ID
        const socket = io(url, {
            query: { userId }, // Send user ID when connecting
        });

        // Listen for real-time updates
        socket.on("onlineUsers", (count) => {
            setOnlineUsers(count);
        });

        // Fetch initial user count via Axios
        axios.get(`${url}/OMS-api/user/online-users`)
            .then((response) => {
                setOnlineUsers(response.data.onlineUsers);
                // console.log("Initial online users count:", response.data.onlineUsers);
            })
            .catch((error) => {
                console.error("Error fetching online users:", error);
            });

        return () => {
            socket.disconnect(); // Clean up connection when component unmounts
        };
    }, []);

    return (
        <SocketContext.Provider value={{ onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
