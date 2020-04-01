import socketIOClient from "socket.io-client";
import { serverUrl } from "../constant/constant";

export const initializeApp = () => {
    const endpoint = serverUrl;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      // this.setState({ response: data });
      console.log("Socker API : ", data);
    }); 
}