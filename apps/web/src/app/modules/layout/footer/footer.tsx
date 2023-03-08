import styles from './footer.module.scss';
import React from "react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { removeNotifications, UserState } from "../../../store/user/store";
import { useAppDispatch } from "../../../store";
import { MapsState } from "../../../store/maps/store";
import { FilterState } from "../../../store/filter/store";

export function Footer() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { notifications } = useSelector<RootState, UserState>((state) => state.user);
  const { offset } = useSelector<RootState, FilterState>((state) => state.filter);
  const { isLoading, total } = useSelector<RootState, MapsState>((state) => state.maps);

  if (notifications.length) {
    notifications.forEach(notification => {
      enqueueSnackbar({
        ...notification,
        variant: notification.type,
      });
    });

    dispatch(removeNotifications(notifications.map(item => item.id)))
  }

  return (
    <div className={styles.footer}>
      { isLoading &&
        <div className={styles.loader}></div>
      }
      {
        total !== null &&
        <span className={styles.counter}>
          { offset || 0 } / { total }
        </span>
      }
    </div>
  );
}

export default Footer;
