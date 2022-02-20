import Environment from './environment';

export default class Kernel {
    private enverionment: Environment;

    public constructor() {
        this.enverionment = new Environment();
    }

    public getEnverionment(): Environment {
        return this.enverionment;
    }
}