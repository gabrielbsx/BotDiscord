import { IEnv } from './environment.dto';
import { config } from 'dotenv';

export default class Environment {
    private env: IEnv = {
        DISCORD_TOKEN: 'teste',
        DATE: new Date(),
    }

    public constructor() {
        config();
        this.env.DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
    }

    public get<T extends keyof IEnv>(key: T): IEnv[T] {
        console.log(this.env[key]);
        return this.env[key];
    }
};