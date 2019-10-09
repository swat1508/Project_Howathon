import React from "react";
import RecastApi from "../../../recast-ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Message-input.styles.scss";

let recast = new RecastApi();

const callRecast = () => {
  recast
    .parseData()
    .then(function(data) {
      // window.confirm(data);
    })
    .catch(function(error) {
      window.confirm("Error While Executing the given command", error);
    });
};

const MessageInput = () => {
  return (
    <div className="message-input">
      <div className="wrap">
        <input
          type="text"
          placeholder="Write your message..."
          id="searchbox"
        ></input>
        <button className="submitQuery" onClick={callRecast}>
          <FontAwesomeIcon icon={faPaperPlane} />
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
