import Kernel from './core/kernel';
import Environment from './core/environment';

class Application extends Kernel {
    public constructor() {
        super();
    }

    public async run(): Promise<void> {
        await this.start();
    }
}


const app = new Application();

app.start();