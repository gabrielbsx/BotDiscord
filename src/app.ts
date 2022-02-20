import { writeFile } from 'fs';
import { config } from 'dotenv';

config();

const main = async (): Promise<void> => {
    console.log(process.env.API_TOKEN);
};

main();