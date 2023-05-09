import styles from './footer.module.scss';
import React from "react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { removeNotifications, UserState } from "../../../store/user/store";
import { useAppDispatch } from "../../../store";
import { MapsState } from "../../../store/maps/store";
import { FilterState } from "../../../store/filter/store";
import ProgressLoader from "@bsab/ui-kit/progress-loader/progress-loader";

export function Footer() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { notifications } = useSelector<RootState, UserState>((state) => state.user);
  const { offset } = useSelector<RootState, FilterState>((state) => state.filter);
  const { isLoading, total, showed } = useSelector<RootState, MapsState>((state) => state.maps);

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
        <ProgressLoader className={styles.footerLoader}/>
      }
      <span className={styles.counter + ' ' + styles.isLeft} title="Showed count">
        { showed.length || 0 }
      </span>
      {
        total !== null &&
        <span className={styles.counter + ' ' + styles.isRight}>
          { offset || 0 } / { total }
        </span>
      }
    </div>
  );
}

export default Footer;
