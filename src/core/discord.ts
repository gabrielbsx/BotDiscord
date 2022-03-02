import { Client, ClientOptions } from 'discord.js';
import Environment from './environment';
import Ranking from '../modules/ranking';
import Chat from '../modules/chat';
import Death from '../modules/death';
import { Droplist } from '../modules/droplist';

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

            Death.setClient(this.client);
            Death.sendDeath();
            
            this.client.on('message', async (message) => {
                Droplist.setClient(this.client);
                Droplist.start(message);
            });
        });
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}