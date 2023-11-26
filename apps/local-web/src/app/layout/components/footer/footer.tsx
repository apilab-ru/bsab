import styles from './footer.module.scss';
import { SnackbarOrigin, SnackbarProvider, useSnackbar } from "notistack";
import { useState } from "react";
import { notificationService } from "../../../services/notification.service";
import { observer } from "mobx-react";

export const Footer = () => {
  const position: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "left"
  }

  const [{list}] = useState(notificationService);
  const {enqueueSnackbar} = useSnackbar();

  if (list.length) {
    list.forEach(item => {

      enqueueSnackbar({
        ...item,
        variant: item.type
      })

      notificationService.removeNotifications(list.map(item => item.id));
    })
  }

  return (
    <div></div>
  );
}

export default observer(Footer);
