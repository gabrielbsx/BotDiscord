import Discord from './discord';
import Environment from './environment';

export default class Kernel {
    private discord: Discord;

    public constructor() {
        this.discord = new Discord();
    }

    public async start(): Promise<void> {
        await this.discord.start();
    }
}