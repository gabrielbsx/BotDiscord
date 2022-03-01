import { AnyChannel, Client, TextChannel } from 'discord.js';
import socketio from 'socket.io-client';
import Environment from '../core/environment';
import { IDeathData } from './death.dto';

export default class Death {
  private static client: Client;

  public static async setClient(client: Client): Promise<void> {
    this.client = client;
  }

  public static async sendDeath(): Promise<void> {
    const channel: TextChannel | any = this.client.channels.cache.find(
      (channel: AnyChannel): TextChannel | any => {
        if (!channel.isText()) return;

        const textChannel = channel as TextChannel;

        if (textChannel.name !== '💀death-ingame') return;

        return textChannel;
      }
    );

    if (!channel) return;

    const socket = socketio(`${Environment.get('SOCKETIO')}`);

    socket.on('botdeath', (data: IDeathData): void => {
      if (data) {
        socket.emit('botdeath', { id: data.id });
        if (data.killer && data.killed) {
          channel.send(`\`\`\`diff\n-${data.killer} matou ${data.killed} em ${data.x}x${data.y}!\n\`\`\``);
        }
      } else {
        socket.emit(`botdeath`, { id: 1 });
      }
    });
  }
}
