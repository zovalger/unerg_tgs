import React from "react";
import styles from "./MessageItem.module.css";

const MessageItem = ({ data, isSent }) => {
  const containerClassName = isSent ? styles.sent : styles.received;

  return <div className={containerClassName}>{data}</div>;
};

export default MessageItem;