const clear = require('clear');
const chalk = require('chalk');
const CLUI = require('clui');
const inquirer = require('inquirer');
const { PathRoute } = require('@vorlefan/path');
const MainRoute = new PathRoute();
MainRoute.set('main', MainRoute.resolve(__dirname, '..', '..', '..'));

/*
:--------------------------------------------------------------------------
: Methods
:--------------------------------------------------------------------------
*/

async function Dev() {
    const content = await MainRoute.io().read({
        routeName: 'main',
        filename: '.env',
    });

    const data = content.replace(
        /((PRODUCTION=)(true|false))/gimu,
        `PRODUCTION=${false}`
    );
    await MainRoute.io().store({ routeName: 'main', filename: '.env', data });
}

async function Prod() {
    const content = await MainRoute.io().read({
        routeName: 'main',
        filename: '.env',
    });
    const data = content.replace(
        /((PRODUCTION=)(true|false))/gimu,
        `PRODUCTION=${true}`
    );
    await MainRoute.io().store({ routeName: 'main', filename: '.env', data });
}

async function SetupServer(mode) {
    const content = await MainRoute.io().read({
        routeName: 'main',
        filename: '.env',
    });

    const data = content.replace(
        /((ONLY_SERVER=)(true|false))/gimu,
        `ONLY_SERVER=${!mode}`
    );

    await MainRoute.io().store({ routeName: 'main', filename: '.env', data });
}

/*
:--------------------------------------------------------------------------
: Caller
:--------------------------------------------------------------------------
*/

const BT_FUNCTIONS = {
    Dev,
    Prod,
    None: async () => process.exit(),
};

/*
:--------------------------------------------------------------------------
: Bootstrap CLI
:--------------------------------------------------------------------------
*/

async function run() {
    clear();
    console.log(chalk.blueBright('READY OR NOT?'), '\n');
    const { choice, mode } = await inquirer.prompt([
        {
            name: 'mode',
            type: 'confirm',
            message:
                'Do you want to enable all application (Y) or just the server (n)?',
        },
        {
            name: 'choice',
            type: 'list',
            message: 'Which mode do you want to switch for?',
            choices: [
                {
                    name: 'None',
                    value: 'None',
                },
                {
                    name: 'Development Mode',
                    value: 'Dev',
                },
                {
                    name: 'Production Mode',
                    value: 'Prod',
                },
            ],
        },
    ]);

    await SetupServer(mode);

    const method = BT_FUNCTIONS[choice];

    const countdown = new CLUI.Spinner(`Switching to ${choice} mode`, [
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
    } catch (error) {
        console.log(error);
    }
})();
