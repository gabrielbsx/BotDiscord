import { writeFile } from 'fs';
import Kernel from './core/kernel';
class Teste {}

class Application extends Kernel {
}

const app = new Application();

app.start();