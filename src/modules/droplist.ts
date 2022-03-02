import axios from "axios";
import { Client } from "discord.js";
import Environment from "../core/environment";

export class Droplist {
    private static client: Client;

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async start(message: any): Promise<void> {
        if (message.content.includes('!droplist')) {
            const channel = this.client.channels.cache.find((channel: any) => channel.name === '🔎droplist');

            if (!channel)
                return;

            if (message.channel.id !== channel.id)
                return;

            const command = message.content.split(' ')[1];

            switch (command) {
                case 'item':
                    var response = await axios.get<any>(`${Environment.get('API')}/droplistbyitemname/${message.content.replace('!droplist item ', '')}`);
                    if (response.data) {
                        var replyMessage = '';
                        for (const item of response.data) {
                            replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                            if (replyMessage.length > 1800) {
                                //await message.reply(replyMessage);
                                try {
                                    await message.author.send(replyMessage);
                                } catch (error) {
                                    console.log(error);
                                }
                                replyMessage = '';
                            }
                        }
                        if (replyMessage.length > 0) {
                            //await message.reply(replyMessage);
                            try {
                                await message.author.send(replyMessage);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    break;
                case 'mob':
                    var response = await axios.get<any>(`${Environment.get('API')}/droplistbymobname/${message.content.replace('!droplist mob ', '')}`);
                    if (response.data) {
                        var replyMessage = '';
                        for (const item of response.data) {
                            replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                            if (replyMessage.length > 1800) {
                                //await message.reply(replyMessage);
                                try {
                                    await message.author.send(replyMessage);
                                } catch (error) {
                                    console.log(error);
                                }
                                replyMessage = '';
                            }
                        }
                        if (replyMessage.length > 0) {
                            //await message.reply(replyMessage);
                            try {
                                await message.author.send(replyMessage);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    break;
                case 'map':
                    var response = await axios.get<any>(`${Environment.get('API')}/droplistbymap/${message.content.replace('!droplist map ', '')}`);
                    if (response.data) {
                        var replyMessage = '';
                        for (const item of response.data) {
                            replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                            if (replyMessage.length > 1800) {
                                //await message.reply(replyMessage);
                                try {
                                    await message.author.send(replyMessage);
                                } catch (error) {
                                    console.log(error);
                                }
                                replyMessage = '';
                            }
                        }
                        if (replyMessage.length > 0) {
                            //await message.reply(replyMessage);
                            try {
                                await message.author.send(replyMessage);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    break;
            }
        }
        return;
    }
}