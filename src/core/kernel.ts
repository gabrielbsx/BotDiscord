import Environment from './environment';
import Discord from './discord';

export default class Kernel {
    private enverionment: Environment;
    private discord: Discord;

    public constructor() {
        this.enverionment = new Environment();
        this.discord = new Discord();
    }

    public enverioment(): Environment {
        return this.enverionment;
    }

    public async start(): Promise<void> {
        this.discord.setToken(this.enverionment.get('DISCORD_TOKEN'));
        await this.discord.start();
    }
}