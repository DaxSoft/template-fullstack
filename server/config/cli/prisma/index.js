const clear = require('clear');
const chalk = require('chalk');
const CLUI = require('clui');
const inquirer = require('inquirer');
const { PrismaSchema } = require('./schema');
const {
    PrismaSave,
    PrismaDeploy,
    PrismaGenerator,
    PrismaStudio,
} = require('./exec');

/*
:--------------------------------------------------------------------------
: Functions
:--------------------------------------------------------------------------
*/

const BT_FUNCTIONS = {
    'Prisma.Builder': async () => {
        await PrismaSave();
        await PrismaDeploy();
        await PrismaGenerator();
    },
    'Prisma.Schema': PrismaSchema,
    'Prisma.Save': PrismaSave,
    'Prisma.Deploy': PrismaDeploy,
    'Prisma.Generator': PrismaGenerator,
    'Prisma.Studio': PrismaStudio,
};

/*
:--------------------------------------------------------------------------
: Bootstrap CLI
:--------------------------------------------------------------------------
*/

async function run() {
    clear();
    console.log(chalk.blueBright('PRISMA CLI'), '\n');
    const { prisma } = await inquirer.prompt({
        name: 'prisma',
        type: 'list',
        message: 'Which command to execute for Prisma functions?',
        choices: [
            {
                name:
                    'Builder | Construct schemas, save and deploy migrations and generates types',
                value: 'Prisma.Builder',
            },
            {
                name: 'Open Database',
                value: 'Prisma.Studio',
            },
            {
                name: 'Construct Schemas',
                value: 'Prisma.Schema',
            },
            {
                name: 'Save Migrations',
                value: 'Prisma.Save',
            },
            {
                name: 'Deploy Migrations',
                value: 'Prisma.Deploy',
            },
            {
                name: 'Generates Types',
                value: 'Prisma.Generator',
            },
        ],
    });

    const method = BT_FUNCTIONS[prisma];

    const countdown = new CLUI.Spinner('Running the method ${prisma}...', [
        '◜',
        '◠',
        '◝',
        '◞',
        '◡',
        '◟',
    ]);
    countdown.start();

    if (!!method) {
        await method();
    }

    countdown.stop();
}

void (async function () {
    try {
        await run();
    } catch (error) {}
})();
