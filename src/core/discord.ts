import { Client, ClientOptions } from 'discord.js';

export default class Discord {
    private token: string = '';
    
    private clientOptions: ClientOptions = {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'],
    };
    private client: Client = new Client(this.clientOptions);

    public constructor() {}

    public setToken(token: string): void {
        this.token = token;
    }

    public async start(): Promise<void> {
        await this.client.login(this.token);
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}