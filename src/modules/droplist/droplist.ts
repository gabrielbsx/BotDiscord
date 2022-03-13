import http from '../../core/http/http';
import { Client, Message } from 'discord.js';

export class Droplist {
    private static client: Client;

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async start(message: Message): Promise<void> {
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
                    //await this.sendDroplistAllItemnames(message);
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

    public static replace(text: string): string {
        return text
            .replace(/[ÀÁÂÃÄÅ]/g, 'A')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[ÈÉÊË]/g, 'E')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ÌÍÎÏ]/g, 'I')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[ÒÓÔÕÖ]/g, 'O')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ÙÚÛÜ]/g, 'U')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[Ç]/g, 'C')
            .replace(/[ç]/g, 'c');
    }

    public static async sendHelp(message: any): Promise<void> {
        await message.reply('```!droplist item <itemname>\n!droplist mob <mobname>\n!droplist map <mapname>\n!droplist mobs\n!droplist maps```');
        return;
    }

    public static async getByItemName(itemName: string): Promise<any> {
        return await http.get<any>(`/droplistbyitemname/${this.replace(itemName)}`);
    }

    public static async getByMobName(mobName: string): Promise<any> {
        return await http.get<any>(`/droplistbymobname/${this.replace(mobName)}`);
    }

    public static async getByMap(map: string): Promise<any> {
        return await http.get<any>(`/droplistbymap/${this.replace(map)}`);
    }

    public static async replyMessage(response: any, message: any): Promise<void> {
        if (!response.data) {
            return;
        }

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

    public static async sendDroplistByItem(message: any): Promise<void> {
        const response = await this.getByItemName(message.content.replace('!droplist item ', '').replace(/\s/g, '_'));
        this.replyMessage(response, message);
    }

    public static async sendDroplistByMob(message: any): Promise<void> {
        const response = await this.getByMobName(message.content.replace('!droplist mob ', '').replace(/\s/g, '_'));
        this.replyMessage(response, message);
    }

    public static async sendDroplistByMap(message: any): Promise<void> {
        const response = await this.getByMap(message.content.replace('!droplist map ', '').replace(/\s/g, '_'));
        this.replyMessage(response, message);
    }

    public static async sendDroplistAll(response: any, message: any): Promise<void> {
        if (!response.data) {
            return;
        }

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

    public static async sendDroplistAllItemnames(message: any): Promise<void> {
        const response = await http.get<any>(`/droplistallitemname`);
        this.sendDroplistAll(response, message);
    }

    public static async sendDroplistAllMobnames(message: any): Promise<void> {
        const response = await http.get<any>(`/droplistallmobname`);
        this.sendDroplistAll(response, message);
    }

    public static async sendDroplistAllMaps(message: any): Promise<void> {
        const response = await http.get<any>(`/droplistallmap`);
        this.sendDroplistAll(response, message);
    }
}