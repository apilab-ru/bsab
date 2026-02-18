import './connection.scss';
import { useState } from "react";
import { Button } from "@mui/material";
import { connectionService, ConnectStatus } from "../../services/connection-service";
import { observer } from 'mobx-react';

export function Connection() {
  const status = useState(connectionService)[0].status;

  const toggleConnect = () => {
    if (status === ConnectStatus.connected) {
      connectionService.disconnect();
    } else {
      connectionService.connect();
    }
  };

  const statusMap: Record<ConnectStatus, string> = {
    connected: 'Подключено',
    delay: 'Подключаемся',
    disconnect: 'Отключено'
  };

  const actionMap: Record<ConnectStatus, string> = {
    connected: '- Отключится',
    delay: '',
    disconnect: '- Подключится'
  }

  return (
    <div className="connection">
      <button className="connection__toggle" onClick={toggleConnect}>
        <img src="/assets/struct/PlayAndPause.png"/>
      </button>

      <span className={"connection__status -" + status}>
        { statusMap[status] }
      </span>

      <span className={"connection__action -" + status}>
        { actionMap[status] }
      </span>
    </div>
  );
}

export default observer(Connection);
