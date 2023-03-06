import { useDispatch } from "react-redux";
import { AppStore } from "./store";
import { AsyncThunkAction } from "@reduxjs/toolkit";

type ThunkDispatch = (action: AsyncThunkAction<any, any, any>) => void;

export type AppDispatch = typeof AppStore.dispatch & ThunkDispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
