import lodash from "lodash";
import { createPool, Pool } from "mysql2";

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    const poolConfig = {
      connectionLimit: 20,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "food_tracking",
    };

    this.pool = createPool(poolConfig);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  sendQuery(query: string, params?: Array<any>) {
    return new Promise<any>((resolve, reject) =>
      this.pool.getConnection((connectionError, connection) => {
        if (connectionError) {
          return reject(connectionError);
        }

        connection.query(query, params, (error, results) => {
          connection.release();

          if (error) {
            return reject(error);
          }
          resolve(this.convertKeysToCamelCase(results));
        });
      })
    );
  }

  private convertKeysToCamelCase = (data: any) => {
    if (lodash.isArray(data)) {
      for (let i = 0; i < data?.length; i++) {
        data[i] = this.convertKeysToCamelCase(data[i]);
      }
      return data;
    }

    let camelCasedObject: any = {};
    for (const [key, value] of Object.entries(data)) {
      camelCasedObject[lodash.camelCase(key)] = value;
    }

    return camelCasedObject;
  };
}
