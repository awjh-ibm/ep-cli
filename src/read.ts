import {Command} from './command';
import {HttpService, HttpServiceConfig} from './httpservice';
import inquirer = require('inquirer');

export class Read extends Command {
    httpService: HttpService
    constructor(dataStore, answers: {[key: string]: any}) {
        super(dataStore, [], answers);
        const httpConfig: HttpServiceConfig = {
            host: 'http://localhost',
            port: process.env.EP_CLI_PORT,
            baseUrl: '/api'
        };
        this.httpService = new HttpService(httpConfig);
    }

    public async questions() {
        const readAnswers: any = await inquirer.prompt([
            {
                type: 'list',
                name: 'assetType',
                message: 'What would you like to read?',
                choices: ['Purchase Orders', 'Finance Requests', 'Go back']
            }
        ]);

        if (readAnswers.assetType === 'Go back') {
            return 'BACK';
        }

        return this.getData(readAnswers);
    }

    public async getData(readAnswers: {[key: string]: any}) {
        const assetType = readAnswers.assetType.toLowerCase().replace(' ', '');

        return this.httpService.get(assetType, {user: this.dataStore.auth});
    }
}
