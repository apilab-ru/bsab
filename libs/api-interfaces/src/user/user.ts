export interface User {
   id: number;
   token: string;
   name: string;
   email: string;
}

export interface UserAuthParams {
   email: string;
   password: string;
}

export interface UserRegParams {
   name?: string;
   email: string;
   password: string;
}
