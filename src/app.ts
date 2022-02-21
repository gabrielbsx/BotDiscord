import Kernel from './core/kernel';

class Application extends Kernel {
    public constructor() {
        super();
    }
}

const app = new Application();
app.start();