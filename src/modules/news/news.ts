import { Client } from 'discord.js';

export class News {
    private static client: Client;

    public static async setClient(client: Client): Promise<void> {
        this.client = client;
    }

    public static async start(): Promise<void> {
        
    }
}