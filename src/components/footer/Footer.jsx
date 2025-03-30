import React from "react";
import { useSocket } from "../../store/utils/SocketContext";

import "./footer.scss";

const Footer = () => {
  const { onlineUsers } = useSocket();

  return (
    <div className="footer">
      <div className="greenDot"></div>
      {onlineUsers} Online
    </div>
  );
};

export default Footer;
