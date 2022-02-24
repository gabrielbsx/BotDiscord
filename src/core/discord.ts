import { Client, ClientOptions } from 'discord.js';
import Environment from './environment';
import Ranking from '../modules/ranking';
import Chat from '../modules/chat';

export default class Discord {
    private clientOptions: ClientOptions = {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING']
    };
    private client: Client = new Client(this.clientOptions);

    public constructor() { }

    public async start(): Promise<void> {
        await this.client.login(Environment.get('DISCORD_TOKEN'));
        this.client.on('ready', () => {
            console.log('Bot is online!');

            Ranking.setClient(this.client);
            Ranking.sendRanking();
            
            Chat.setClient(this.client);
            Chat.sendChat();
        });
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}