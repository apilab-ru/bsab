import styles from './profile.module.scss';
import Header from '../../layout/header/header';
import React, { FormEvent, useState } from 'react';
import { mapsApiService } from '../../../services/maps-api-service';
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setConfig, UserState } from "../../../store/user/store";
import { RootState } from "../../../store/store";
import { buildForm } from "@shared/forms/build-form";
import { Input } from "@bsab/ui-kit/input/input";
import { observer } from "mobx-react";
import { userService } from "../../../store-mobx/user-service";

const Profile = () => {
  const dispatch = useDispatch();
  const idsRef = React.createRef<HTMLTextAreaElement>();
  const configFormRef = React.createRef<HTMLFormElement>();

  const { user, config } = useSelector<RootState, UserState>((state) => state.user);

  const [userTest] = useState(() => userService);
  console.log('xxx userTest', userTest.user);

  const importShowedItems = () => {
    const ids = JSON.parse(idsRef.current!.value);
    mapsApiService.markAsShowedList(ids, user!.token).then(() => alert('Success'));
  }

  const saveConfig = (event: FormEvent) => {
    event.preventDefault();
    const form = buildForm(event.target);
    dispatch(setConfig(form));
  }

  const importSongs = () => {}

  return (
    <div>
      <Header></Header>

      <p>
        { JSON.stringify(userTest.user) }
      </p>

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

        <form className={styles.row} onSubmit={ saveConfig } ref={ configFormRef }>
          <label className={styles.label}>User Configs</label>

          <Input
            className={styles.line}
            label="Local api"
            variant="standard"
            name='localApi'
            value={config?.localApi}
          />

          { config?.localApi &&
            <Button className={styles.actionButton} variant="outlined">
              Parsing
            </Button>
          }

          <Button className={styles.button} variant="contained" type="submit">
            Update config
          </Button>
        </form>
      </div>
    </div>
  );
}

export default observer(Profile);
