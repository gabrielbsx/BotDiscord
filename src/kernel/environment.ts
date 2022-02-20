import { IEnv } from './environment.dto';

export default class Environment {
    private static _instance: Environment;
    private env: IEnv;

    private constructor() {
        this.env = {
            API_TOKEN: process.env.API_TOKEN,
        };
    }

    public get<T extends keyof IEnv>(key: string): IEnv[T] {
        return this.env[key];
    }

    public static getInstance(): Environment {
        if (!Environment._instance) {
            Environment._instance = new Environment();
        }
        return Environment._instance;
    }

    public static setInstance(instance: Environment): void {
        Environment._instance = instance;
    }
};