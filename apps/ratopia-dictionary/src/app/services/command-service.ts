import axios from 'axios';
import { environment } from "../../environments/environment";

export class CommandService {
   private api = environment.api;

   refreshRate(): Promise<void> {
      return axios.post(this.api + '/command/refresh-rats', {});
   }
}

export const commandService = new CommandService();
