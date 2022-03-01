import { Client, ClientOptions } from 'discord.js';
import Environment from './environment';
import Ranking from '../modules/ranking';
import Chat from '../modules/chat';
import Death from '../modules/death';
import axios from 'axios';

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

            //command !droplist
            this.client.on('message', async (message) => {
                if (message.content.includes('!droplist')) {
                    const channel = this.client.channels.cache.find((channel: any) => channel.name === '🔎droplist');

                    if (!channel)
                        return;

                    if (message.channel.id !== channel.id)
                        return;

                    const command = message.content.split(' ')[1];

                    switch(command) {
                        case 'item':
                            var response = await axios.get<any>(`${Environment.get('API')}/droplistbyitemname/${message.content.split(' ')[2]}`);
                            if (response.data) {
                                var replyMessage = '';
                                for (const item of response.data) {
                                    replyMessage += `Mob: ${item.mobname} - Map: ${item.map} - ${item.item.itemname.replace(/_/g, ' ')}\n`;
                                    if (replyMessage.length > 1800) {
                                        await message.reply(replyMessage);
                                        replyMessage = '';
                                    }
                                }
                                await message.reply(replyMessage);
                            }
                            break;
                        case 'mob':
                            var response = await axios.get<any>(`${Environment.get('API')}/droplistbymob/${message.content.split(' ')[2]}`);
                            if (response.data) {
                                var replyMessage = '';
                                for (const item of response.data) {
                                    replyMessage += `Mob: ${item.mobname} - Map: ${item.map} - ${item.item.itemname.replace(/_/g, ' ')}\n`;
                                    if (replyMessage.length > 1800) {
                                        await message.reply(replyMessage);
                                        replyMessage = '';
                                    }
                                }
                                await message.reply(replyMessage);
                            }
                            break;
                        case 'map':
                            var response = await axios.get<any>(`${Environment.get('API')}/droplistbymap/${message.content.split(' ')[2]}`);
                            if (response.data) {
                                var replyMessage = '';
                                for (const item of response.data) {
                                    replyMessage += `Mob: ${item.mobname} - Map: ${item.map} - ${item.item.itemname.replace(/_/g, ' ')}\n`;
                                    if (replyMessage.length > 1800) {
                                        await message.reply(replyMessage);
                                        replyMessage = '';
                                    }
                                }
                                await message.reply(replyMessage);
                            }
                            break;
                    }
                }
            });
        });
    }

    public async stop(): Promise<void> {
        await this.client.destroy();
    }
}