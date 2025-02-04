import styles from './connect-page.module.scss';
import Connection from "../../components/connection/connection";
import { useEffect } from "react";

export function ConnectPage() {
  const websocketConnect = () => {
    console.log('xxx start connect');

    const socket = new WebSocket("ws://localhost:5000/ws/");

    socket.onopen = () => {
      console.log("Соединение установлено");
      socket.send("Привет, сервер!");
    };

    socket.onmessage = (event) => {
      console.log("Ответ от сервера:", event.data);
    };

    socket.onclose = () => {
      console.log("Соединение закрыто");
    };
  }

  return (
    <>
      <Connection/>
      <button onClick={websocketConnect}>Connect</button>
    </>
  );
}

export default ConnectPage;
