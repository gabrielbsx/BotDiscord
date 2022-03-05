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
                    await this.sendDroplistByItem(message);
                    break;
                case 'mob':
                    await this.sendDroplistByMob(message);
                    break;
                case 'map':
                    await this.sendDroplistByMap(message);
                    break;
                case 'help':
                    await this.sendHelp(message);
                    break;
                case 'items':
                    await this.sendDroplistAllItemnames(message);
                    break;
                case 'mobs':
                    await this.sendDroplistAllMobnames(message);
                    break;
                case 'maps':
                    await this.sendDroplistAllMaps(message);
                    break;
            }
        }
        return;
    }

    public static async sendHelp(message: any): Promise<void> {
        await message.reply('```!droplist item <itemname>\n!droplist mob <mobname>\n!droplist map <mapname>\n!droplist items\n!droplist mobs\n!droplist maps```');
        return;
    }

    public static async getByItemName(itemName: string): Promise<any> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistbyitemname/${itemName}`);
        return response;
    }

    public static async getByMobName(mobName: string): Promise<any> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistbymobname/${mobName}`);
        return response;
    }

    public static async getByMap(map: string): Promise<any> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistbymap/${map}`);
        return response;
    }

    public static async sendDroplistByItem(message: any): Promise<void> {
        var response = await this.getByItemName(message.content.replace('!droplist item ', '').replace(/\s/g, '_'));
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }

    public static async sendDroplistByMob(message: any): Promise<void> {
        var response = await this.getByMobName(message.content.replace('!droplist mob ', '').replace(/\s/g, '_'));
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }

    public static async sendDroplistByMap(message: any): Promise<void> {
        var response = await this.getByMap(message.content.replace('!droplist map ', '').replace(/\s/g, '_'));
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`Mob: ${item.mobname}\` - \`Map: ${item.map}\` - \`${item.item.itemname.replace(/_/g, ' ')}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }

    public static async sendDroplistAllItemnames(message: any): Promise<void> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistallitemname`);
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`${item.itemname.replace(/_/g, ' ')}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }

    public static async sendDroplistAllMobnames(message: any): Promise<void> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistallmobname`);
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`${item.mobname}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }

    public static async sendDroplistAllMaps(message: any): Promise<void> {
        var response = await axios.get<any>(`${Environment.get('API')}/droplistallmap`);
        if (response.data) {
            var replyMessage = '';
            for (const item of response.data) {
                replyMessage += `\`${item.map}\`\n`;
                if (replyMessage.length > 1800) {
                    await message.reply(replyMessage);
                    replyMessage = '';
                }
            }
            if (replyMessage.length > 0) {
                await message.reply(replyMessage);
            }
        }
        return;
    }
}