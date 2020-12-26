const clear = require('clear');
const chalk = require('chalk');
const CLUI = require('clui');
const inquirer = require('inquirer');
const { PathRoute } = require('@vorlefan/path');
const { CountFileLines } = require('./countFileLineNumbers');

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

const MainRoute = new PathRoute();
MainRoute.set('main', MainRoute.resolve(__dirname, '..', '..', '..', '..'));

/*
:--------------------------------------------------------------------------
: Number of Lines
:--------------------------------------------------------------------------
*/

async function numberLines() {
    const server = await MainRoute.io().allFiles(
        MainRoute.plug('main', 'server')
    );

    const collector = [...server];
    let count = 0;

    await Promise.allSettled(
        collector.map(async (filepath) => {
            try {
                const result = await CountFileLines(filepath);
                if (typeof result === 'number') {
                    count += result;
                }
            } catch (error) {
                console.log(filepath);
                console.error(error);
            }
        })
    );

    console.log(
        chalk.greenBright(`Total of lines coded is:\t`),
        chalk.redBright(count)
    );
    console.log('out of');
    console.log(
        chalk.greenBright(`Total of files included:\t`),
        chalk.redBright(collector.length)
    );
}

/*
:--------------------------------------------------------------------------
: Bootstrap CLI
:--------------------------------------------------------------------------
*/

async function run() {
    clear();
    console.log(chalk.blueBright('STATICS'), '\n');
    await numberLines();
}

void (async function () {
    try {
        await run();
        console.log('\n\n');
    } catch (error) {
        console.log(error);
    }
})();
