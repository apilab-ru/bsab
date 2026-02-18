// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.styles.scss';

import Layout from "./components/layout/layout";
import { useEffect } from "react";
import { connectionService } from "./services/connection-service";

export function App() {
  useEffect(() => {
    const interval = setInterval(() => connectionService.refresh(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Layout></Layout>
    </>
  );
}

export default App;
