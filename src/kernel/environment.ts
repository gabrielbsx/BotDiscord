import { IEnv } from './environment.dto';
import { config } from 'dotenv';

export default class Environment {
    private env: IEnv;

    public constructor() {
        config();
        this.env = {
            API_TOKEN: process.env.API_TOKEN,
            DATE: new Date(),
        };
    }

    public get<T extends keyof IEnv>(key: T): IEnv[T] {
        return this.env[key];
    }
};