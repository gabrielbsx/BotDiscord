import { Client, ClientOptions, TextChannel, VoiceChannel } from 'discord.js';

export default class Discord {
    private token: string = '';
    private modules: any = {
        'helloworld': import('../modules/helloworld'),
    }

    private clientOptions: ClientOptions = {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING']
    };
    private client: Client = new Client(this.clientOptions);

    public constructor() { }

    public setToken(token: string): void {
        this.token = token;
    }

    public async start(): Promise<void> {
        await this.client.login(this.token);
        this.client.on('ready', () => {
            console.log('Bot is online!');

            const channel = this.client.channels.cache;

            const info = channel.find((channel: any) => channel.name.includes('ranking') ? channel.name : null);

            console.log(info);
        });
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}