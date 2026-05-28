import {appConfig} from "./app-config";
import mysql2, {PoolOptions, QueryResult} from "mysql2";

class Dal {

    private options: PoolOptions = {
        host: appConfig.host,
        port: appConfig.port,
        user: appConfig.user,
        password: appConfig.password,
        database: appConfig.database,
    }

    private connection = mysql2.createPool(this.options);
    private poolPromise = this.connection.promise();

    public async execute(sql: string, params?: any[]): Promise<QueryResult> {
            const [result] = await this.poolPromise.query(sql, params);
            return result;
    }
}

export const dal = new Dal();
