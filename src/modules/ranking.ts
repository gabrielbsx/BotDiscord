import axios from 'axios';
import { AnyChannel, Client, TextChannel } from 'discord.js';
import Environment from '../core/environment';
import { IRankingData, IRanking } from './ranking.dto';
import gameconfig from '../config/game';
import { MessageEmbed } from 'discord.js';

export default class Ranking {
    private static client: Client;

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async sendRanking(): Promise<void> {
        const channel: TextChannel | any = this.client.channels.cache.find((channel: AnyChannel): TextChannel | any => {
            if (!channel.isText())
                return;

            const textChannel = channel as TextChannel;

            if (textChannel.name !== '💪ranking')
                return;

            return textChannel;
        });

        if (!channel)
            return;

        const ranking = await axios.get<IRanking>(`${Environment.get('API')}/ranking`);

        //create message embbed with ranking data
        const fields: Array<{ name: string, value: string, inline: boolean }> = [];

        ranking.data.data.forEach((player: IRankingData, index: number): void => {
            fields.push({
                name: `${index + 1}. ${player.nick}`,
                value: `Level: ${player.level}, Frag${player.frags > 1 ? 's' : ''}: ${player.frags} :underworld:`,
                inline: false,
            });
        });

        const embed = new MessageEmbed();
        embed.setTitle('💪Ranking');
        embed.setColor('#0099ff');
        embed.setDescription('Top 10 players in the game');
        embed.setFooter({
            text: 'Made with ❤️ by UnderworldBOT',
        });
        embed.setTimestamp();
        embed.setThumbnail('https://wydunderworld.com/static/components/Logo/Logo-wow-sitenav.596840db77b4d485a44d65e897e3de57.png');
        embed.addFields(fields);
        
        channel.send({
            embeds: [embed],
        });

        return;
    }
}