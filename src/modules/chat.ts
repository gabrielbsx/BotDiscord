import { AnyChannel, Client, TextChannel } from "discord.js";
import socketio from "socket.io-client";
import Environment from "../core/environment";
import { IChatData } from "./chat.dto";

export default class Chat {
  private static client: Client;

  public static async setClient(client: Client): Promise<void> {
    this.client = client;
  }

  public static async sendChat(): Promise<void> {
    const channel: TextChannel | any = this.client.channels.cache.find(
      (channel: AnyChannel): TextChannel | any => {
        if (!channel.isText()) return;

        const textChannel = channel as TextChannel;

        if (textChannel.name !== "📄chat-ingame") return;

        return textChannel;
      }
    );

    if (!channel) return;

    //delete all messages in channel
    /*channel.messages.fetch({ limit: 100 }).then((messages: any): void => {
      messages.forEach((message: any): void => {
        message.delete();
      });
    });*/

    const socket = socketio(`${Environment.get("SOCKETIO")}`);

    socket.on("botmessages", (data: IChatData): void => {
      if (data) {
        if (data.message && data.nick) {
          if (data!.message[0] === "@") {
            channel.send(`[${data.nick}]> ${data.message.replace("@", "")}`);
          }
        }
        socket.emit("botmessages", { id: data.id });
      } else {
        socket.emit(`botmessages`, { id: 1 });
      }
    });
  }
}
