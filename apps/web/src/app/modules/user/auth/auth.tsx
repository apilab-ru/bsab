import styles from './auth.module.scss';
import { Alert, Dialog, Tab, Tabs, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import { buildForm } from "@shared/forms/build-form";
import { UserRegParams } from "@bsab/api/user/user";
import { setError, UserState } from "../../../store/user/store";
import { useAppDispatch } from "../../../store";
import { userLogin, userRegistration } from "../../../store/user/middlewares";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface AuthProps {
  isOpened: boolean,
  handleClose: () => void;
}

enum Mode {
  auth,
  registration,
}

export function Auth({ isOpened, ...props }: AuthProps) {
  const [mode, setMode] = useState(Mode.auth);

  const onTabChange = (event: unknown, detail: Mode) => {
    setMode(detail);
    dispatch(setError(null))
  };

  const dispatch = useAppDispatch();

  const { error, loading, user } = useSelector<RootState, UserState>((state) => state.user);

  if (user) {
    props.handleClose();
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = buildForm<UserRegParams>(event.target);

    if (mode === Mode.registration) {
      dispatch(userRegistration(form))
    } else {
      dispatch(userLogin(form))
    }
  }

  return (
    <Dialog onClose={ props.handleClose } open={ isOpened } maxWidth={false}>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <Tabs
          value={mode}
          onChange={onTabChange}
        >
          <Tab value={Mode.auth} label="Auth" />
          <Tab value={Mode.registration} label="Registration" />
        </Tabs>

        <div className={styles.rows}>
          { mode === Mode.registration &&
            <TextField className={styles.line} label="Name" variant="standard" name='name'/>
          }

          <TextField className={styles.line} label="Email" variant="standard" name='email' />

          <TextField className={styles.line} label="Password" variant="standard" name='password' />

          { error &&
            <Alert className={styles.line} severity="error">{ error }</Alert>
          }

          <Button className={styles.line} variant="contained" type="submit" disabled={loading}>
            { mode === Mode.auth ? 'Auth' : 'Registration' }
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default Auth;
