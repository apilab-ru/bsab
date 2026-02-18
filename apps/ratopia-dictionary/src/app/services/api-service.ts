import axios from 'axios';
import { environment } from "../../environments/environment";
import { DictionaryResponse } from "../models/dictionary";
import { DiplomaticData } from "../models/diplomatic-data";

export class ApiService {
   private api = environment.api;
   private apiPostfix = environment.apiPostfix;

   refreshRate(): Promise<void> {
      return axios.get(this.api + '/refresh-citizen');
   }

   ping(): Promise<boolean> {
      return axios.get(this.api + '/ping' + this.apiPostfix)
        .then(res => !!res.data.result)
         .catch(err => false);
   }

   loadDictionary(): Promise<DictionaryResponse> {
      return axios.get(this.api + '/dictionary' + this.apiPostfix).then(res => res.data);
   }

   loadDiplomaticData(): Promise<DiplomaticData> {
      return axios.get(this.api + '/diplomatic-data').then(res => res.data);
   }

   openPage(page: string): Promise<void> {
      return axios.get(this.api + '/open/' + page).then(res => res.data);
   }

}

export const apiService = new ApiService();
