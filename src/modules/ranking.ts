import axios from 'axios';
import { AnyChannel, Client, TextChannel } from 'discord.js';
import Environment from '../core/environment';
import { IRankingData, IRanking } from './ranking.dto';
import gameconfig from  '../config/game';

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

        //message embedded in the channel discord

        const fields = [...ranking.data.data.map((player: IRankingData): any => {
            return {
                name: `${player.nick}`,
                value: `${player.class} ${player.evolution} ${player.kingdom}`,
                inline: true
            };
        })];

        const message = await channel.send({
            embed: {
                title: '💪Ranking',
                description: '',
                color: 0x00ff00,
                fields: fields,
                timestamp: new Date(),
                footer: {
                    text: 'Powered by the Underworld BOT',
                },
            },
        });
    }
}