const { exec } = require('child_process');

const nCbExec = (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
};

exports.PrismaStudio = async () =>
    exec('npx prisma sutdio --pewview-feature --experimental', nCbExec);

exports.PrismaGenerator = async () => exec('npx prisma generate', nCbExec);

exports.PrismaSave = async () =>
    exec('npx prisma migrate dev --preview-feature', nCbExec);

exports.PrismaDeploy = async () =>
    exec('npx prisma migrate deploy --preview-feature', nCbExec);
