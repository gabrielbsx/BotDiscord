import axios from 'axios';
import { AnyChannel, Client, TextChannel } from 'discord.js';
import socketio from 'socket.io-client';
import Environment from '../core/environment';
import { IChat } from './chat.dto';

export default class Chat {
    private static client: Client;

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async sendChat(): Promise<void> {
        const channel: TextChannel | any = this.client.channels.cache.find((channel: AnyChannel): TextChannel | any => {
            if (!channel.isText())
                return;

            const textChannel = channel as TextChannel;

            if (textChannel.name !== '💬chat-ingame')
                return;

            return textChannel;
        });

        if (!channel)
            return;

        const socket = socketio(`${Environment.get('SOCKETIO')}`);

        socket.on('messages', (data): void => {
            console.log(data);
        });
    }
}