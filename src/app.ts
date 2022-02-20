import { writeFile } from 'fs';
import Kernel from './kernel/kernel';

class Application extends Kernel {
}

const app = new Application();

const api = app.getEnverionment().get('API_TOKEN');

console.log(api);