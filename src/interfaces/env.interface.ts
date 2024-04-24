export interface IDatabase {
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
}

export interface IEnv {
  port: number;
  database: IDatabase;
}
