import Connection from "../../components/connection/connection";
import { observer } from "mobx-react";

export function ConnectPage() {
  return (
    <>
      <Connection/>
    </>
  );
}

export default observer(ConnectPage);
