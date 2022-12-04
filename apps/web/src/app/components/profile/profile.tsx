import styles from './profile.module.scss';
import Header from '../header/header';
import React from 'react';
import { mapsApiService } from '../../services/maps-api-service';
import Button from "@mui/material/Button";

export function Profile() {
  const idsRef = React.createRef<HTMLTextAreaElement>();

  const importShowedItems = () => {
    const ids = JSON.parse(idsRef.current!.value);
    mapsApiService.markAsShowedList(ids).then(() => alert('Success'));
  }

  const importSongs = () => {

  }

  return (
    <div>
      <Header></Header>

      <div className={styles.content}>
        <div className={styles.row}>
          <label className={styles.label}>Import showed items</label>
          <textarea className={styles.textarea} ref={idsRef} placeholder='["123", "456"]'></textarea>
          <Button className={styles.button} onClick={importShowedItems} variant="contained">
            Import
          </Button>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Import liked songs</label>
          <textarea className={styles.textarea} ref={idsRef} placeholder='["123", "456"]'></textarea>
          <Button className={styles.button} onClick={importSongs} variant="contained">
            Import
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
