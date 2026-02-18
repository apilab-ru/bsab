export interface Trade {
  resource: string;
  price: number;
  package: number;
}

export interface City {
  key: string;
  name: string;
  export: Trade[];
  import: Trade[];
  relations: number;
  currency: string;
}