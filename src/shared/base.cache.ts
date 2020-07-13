import { RedisClient } from "redis";
import { environment } from "src/config/environment";

export abstract class BaseCache<TValue> {

    private _client: RedisClient = null;

    constructor(private baseKey: string) { this.init(); }

    protected set(key: string, value: TValue): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {

            const fullKey = `${this.baseKey}:${key}`;
            var jsonValue = JSON.stringify(value);

            this._client.set(fullKey, jsonValue, function (err, reply) {

                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    protected get(key: string): Promise<TValue> {
        return new Promise<TValue>((resolve, reject) => {
            const fullKey = `${this.baseKey}:${key}`;
            this._client.get(fullKey, function (err, jsonValue) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    var objValue = JSON.parse(jsonValue);
                    resolve(objValue);
                }
            });
        });
    }

    protected deleteKey(key: string): Promise<any> {
        return new Promise<any>((resolver, reject) => { 
            const fullKey = `${this.baseKey}:${key}`;
            this._client.del(fullKey, function(err, reply) {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolver();
                }
            });
        });
    }

    private init(): void {
        const redis = require("redis");
        this._client = redis.createClient((<number>environment.redis.port), environment.redis.host);

        this._client.on('connect', function () {
            console.log("connected");
        });
    }
}