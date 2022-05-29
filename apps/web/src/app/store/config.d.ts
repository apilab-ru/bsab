import 'react-redux';
export { RootState } from "./store";

declare module 'react-redux' {
   interface DefaultRootState extends RootState {
   }
}
