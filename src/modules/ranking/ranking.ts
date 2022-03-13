import { AnyChannel, Client, TextChannel } from 'discord.js';
import { IRankingData, IRanking } from './ranking.dto';
import gameconfig from '../../config/game';
import { MessageEmbed } from 'discord.js';
import http from '../../core/http/http';
import { IFields } from './ranking.interface';

export default class Ranking {
  private static client: Client;

  public static async setClient(client: Client): Promise<void> {
    this.client = client;
  }

  public static async sendRanking(): Promise<void> {
    const channel: TextChannel | any = this.client.channels.cache.find(
      (channel: AnyChannel): TextChannel | any => {
        if (!channel.isText()) return;

        const textChannel = channel as TextChannel;

        if (textChannel.name !== '💪ranking') return;

        return textChannel;
      }
    );

    if (!channel) return;

    const ranking = await http.get<IRanking>(
      `/ranking`
    );

    const fields: Array<IFields> = [];

    ranking.data.data.forEach((player: IRankingData, index: number): void => {
      const _class = gameconfig.get('class')!.get(player.class);
      const _evolution = gameconfig.get('evolution')!.get(player.evolution);
      const _kingdom = gameconfig.get('kingdom')!.get(player.kingdom);

      fields.push({
        name: `${index + 1}. ${_kingdom}${_class}[${_evolution}] ${player.nick
          }`,
        value: `Level: ${player.level + 1}, Frag${player.frags > 1 ? 's' : ''
          }: ${player.frags}`,
        inline: false,
      });
    });

    const embed = new MessageEmbed();
    embed.setTitle('💪Ranking');
    embed.setColor('#0099ff');
    embed.setDescription('Top 5 players in the game');
    embed.setFooter({
      text: 'Made with ❤️ by Underworld BOT',
    });
    embed.setTimestamp();
    embed.setThumbnail(
      'https://wydunderworld.com/static/components/Logo/Logo-wow-sitenav.596840db77b4d485a44d65e897e3de57.png'
    );
    embed.addFields(fields);

    const message = await channel.send({
      embeds: [embed],
    });

    //waiting for 10 minutes to delete the message and call sendranking
    setTimeout(async (): Promise<void> => {
      await message.delete();
      await Ranking.sendRanking();
    }, 1000 * 60 * 10);

    return;
  }
}
