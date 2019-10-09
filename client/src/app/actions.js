import socketIOClient from "socket.io-client";

export const initializeApp = () => {
    const endpoint = "http://127.0.0.1:4001"
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      // this.setState({ response: data });
      console.log("Socker API : ", data);
    });
}