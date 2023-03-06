import { AnyAction } from "@reduxjs/toolkit";

export function makeCheckAction(name: string): (action: AnyAction) => boolean {
   return action => action.type.indexOf(name + '/') === 0;
}
