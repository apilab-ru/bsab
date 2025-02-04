import styles from './connection.module.scss';
import { useState } from "react";
import { Button } from "@mui/material";
import { connectionService, ConnectStatus } from "../../services/connection-service";
import { observer } from 'mobx-react';

export function Connection() {
  const status = useState(connectionService)[0].status;

  const startConnect = () => {
    if (status === ConnectStatus.connected) {
      connectionService.disconnect();
    } else {
      connectionService.connect();
    }
  };

  return (
    <div className={styles.connection}>
      <span>{ status }</span>
      <Button variant="contained" onClick={() => startConnect()} color={status !== ConnectStatus.connected ? 'secondary' : 'primary'}>
        { status === ConnectStatus.connected ? 'Отключится' : 'Подключится' }
      </Button>
    </div>
  );
}

export default observer(Connection);
