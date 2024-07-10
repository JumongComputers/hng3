declare module '*/db-config.cjs' {
    interface DbConfig {
      username: string;
      password: string;
      database: string;
      host: string;
      port: number;
      dialect: string;
      dialectOptions: {
        ssl: {
          require: boolean;
          rejectUnauthorized: boolean;
        };
      };
    }
  
    interface Config {
      development: DbConfig;
      test: DbConfig;
      production: DbConfig;
    }
  
    const value: Config;
    export = value;
  }
  