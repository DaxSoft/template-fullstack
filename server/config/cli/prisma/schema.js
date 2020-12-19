// (\/\/\s?<header>(.|\n)*?<\/header>)
// Unify all models into schema.prisma;

const { PathRoute } = require('@vorlefan/path');

const MainRoute = new PathRoute();

MainRoute.set('main', MainRoute.resolve(__dirname, '..', '..', '..', '..'));

function getStructure() {
    return `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
  `;
}

// get all model from prisma folder
MainRoute.set('prisma', MainRoute.plug('main', 'prisma'));
MainRoute.join('prisma/models', 'prisma', 'models');

// create a structure-string content for the main file
MainRoute.setItem('content', getStructure().trim());

async function recursiveModels(list) {
    if (list.length === 0) return;
    const currentModel = list.shift();
    try {
        if (!!currentModel) {
            console.log('attempt at', currentModel.filename);
            const model = await MainRoute.io().read(currentModel);

            let contentModel = model;
            contentModel = contentModel
                .replace(/(\/\/\s?<header>(.|\n)*?<\/header>)/gimu, '')
                .replace(/(\/\/(.*))/giu, '');
            MainRoute._storage[
                'content'
            ] = `${MainRoute._storage['content']}\n\n${contentModel}`;
        }
    } catch (error) {
        console.error(error);
        console.log('error at', currentModel.filename);
    }
    return await recursiveModels(list);
}

exports.PrismaSchema = async function PrismaSchema() {
    try {
        console.log('Unify models schema into one file');

        // get the list of all models
        const models = MainRoute.io().files({
            routeName: 'prisma/models',
            extension: 'prisma',
        });

        await recursiveModels(models);

        // console.log(MainRoute.getItem('content'));

        // save
        await MainRoute.io().store({
            routeName: 'prisma',
            filename: 'schema.prisma',
            data: MainRoute.getItem('content'),
            force: true,
        });
        console.log(
            'GENERATED schema.prisma',
            MainRoute.plug('prisma', 'schema.prisma')
        );
    } catch (error) {
        console.log(error);
    }
};
