export interface IDatabase {
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
}

export interface IEnv {
  port: number;
  version: string;
  tbeBaseUrl: string;
  tbeAccessToken: string;
  database: IDatabase;
}
