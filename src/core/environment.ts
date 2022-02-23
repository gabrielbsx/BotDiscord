import { IEnvironment } from './environment.dto';
import { config } from 'dotenv';

class Environment {
    private static environment: IEnvironment = {
        DISCORD_TOKEN: '',
        API: '',
        SOCKETIO: '',
    }

    public static init(): void {
        config();
        this.environment.DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
        this.environment.API = process.env.API as string;
        this.environment.SOCKETIO = process.env.SOCKETIO as string;
    }

    public static get<T extends keyof IEnvironment>(key: T): IEnvironment[T] {
        return this.environment[key];
    }
};

Environment.init();

export default Environment;