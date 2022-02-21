import { AnyChannel, Client, ClientOptions, TextChannel } from 'discord.js';
import Environment from './environment';
import axios from 'axios';

export default class Discord {
    private modules: any = {
        'helloworld': import('../modules/helloworld'),
    }

    private clientOptions: ClientOptions = {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING']
    };
    private client: Client = new Client(this.clientOptions);

    public constructor() { }
    


    public async start(): Promise<void> {
        await this.client.login(Environment.get('DISCORD_TOKEN'));
        this.client.on('ready', () => {
            console.log('Bot is online!');

            const channel = this.client.channels.cache;

            channel.forEach(async (channel: AnyChannel) => {
                if (channel.isText()) {
                    const textChannel = channel as TextChannel;
                    if (textChannel.name === '💪ranking') {
                        const ranking = await axios.get(`${Environment.get('API')}/ranking`);
                        console.log(ranking);
                    }
                }
            });
        });
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}