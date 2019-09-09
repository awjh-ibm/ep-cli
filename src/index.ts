import inquirer = require("inquirer");
import 'colors';
import { CommandRouter } from './commandrouter';
import { PrettyError } from "./prettyerror";
import Table = require('cli-table');


const dataStore = {
    auth: null
};

async function questionBuilder() {
    if (dataStore.auth === null) {
        return login()
    } else {
        // return Promise.resolve({});
        return highLevelActions();
    }
}

async function run() {
    console.log('Welcome to the We.Trade POC Enrolling Party CLI')
    while (true) {
        const answers: any = await questionBuilder();
        if (answers.hasOwnProperty('username')) {
            dataStore.auth = answers.username;
        } else {
            await route(dataStore, answers);
        }
    }
}

async function route(dataStore, answers) {
    if (!dataStore.hasOwnProperty('auth')) {
        return run();
    }

    try {
        await CommandRouter.route(dataStore, answers);
    } catch (err) {
        if (err instanceof PrettyError) {
            console.log(err.toTable());
        } else {
            console.log(err);
        }
        const username = answers.username;
        const password = answers.password;
        answers = await highLevelActions();
        answers.username = username;
        answers.password = password;
        await route(dataStore, answers);
    }
}

async function login() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'username',
            message: 'What is your username?',
            choices: ['alice@AmsterdamBankEP', 'bob@BankOfBrusselsEP'],
            validate: (answer) => {
                if (answer.split("@").length !== 2) {
                    return "Username must be of form <NAME>@<ORG>"
                }

                return true;
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'What is your password?'
        },
    ]);

    const splitUser = answers.username.split("@");
    const user: string = splitUser[0];
    const org: string = splitUser[1];

    const message = "Welcome " + user.underline + " to " + org.underline + "'s portal";

    var table = new Table({
        chars: { 'top': '═', 'top-left': '╔', 'top-right': '╗' , 'bottom': '═', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'right': '║', }
    });
    table.push([message]);
    console.log(table.toString());

    return answers;
}

function highLevelActions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'highLevel',
            message: 'Which action do you want to do?',
            choices: ['Create', 'Read', 'Other', 'Exit']
        },
    ]);
}
run();
