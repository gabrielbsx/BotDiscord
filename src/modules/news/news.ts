import { AnyChannel, Client, MessageEmbed, TextChannel } from 'discord.js';
import socketio from 'socket.io-client';
import Environment from '../../core/environment/environment';

export class News {
    private static client: Client;
    private static categories = {
        '1': '📰novidade',
        '2': '🔧manutenção',
        '3': '🩹patchlist',
        '4': '📜nota',
        '5': '📅evento',
    };

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async start(): Promise<void> {
        console.log('News module started');

        const socket = socketio(`${Environment.get('SOCKETIO')}`);

        socket.on('news', (data: any): void => {
            const channel: TextChannel | any = this.client.channels.cache.find(
                (channel: AnyChannel): TextChannel | any => {
                    if (!channel.isText()) return;

                    const textChannel = channel as TextChannel;

                    const category = this.categories[data.category];

                    if (textChannel.name !== category) {
                        return;
                    }

                    return textChannel;
                }
            );

            if (!channel) {
                return;
            }

            const embed = new MessageEmbed();

            embed.setTitle(data.title);
            embed.setThumbnail(data.thumbnail);
            embed.setDescription(data.content);
            embed.setColor('#0099ff');
            embed.setURL(`https://wydunderworld.com/news/${data.slug}`);
            embed.setFooter({
                text: 'Made with ❤️ by Underworld BOT',
            });
            embed.setTimestamp();
            embed.setImage(data.thumbnail);

            channel.send(embed);
        });
    }
}