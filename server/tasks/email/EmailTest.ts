import { UtilsEmailTemplateReplacer } from '@/libraries/email-template';
import { Job } from 'bullmq';
import { EMAIL_USER } from '@/config/email/config';
import { EmailTransporterSend } from '@/config/email';
import { AssetsRotue } from '@/server/config/path';
import { SendMailOptions } from 'nodemailer';

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

async function getTemplateHTML(): Promise<string> {
    const file = await AssetsRotue.io().read({
        routeName: 'email',
        filename: 'EmailTest.html',
    });
    const fileContent = file as string;

    let content = await UtilsEmailTemplateReplacer(fileContent, {});
    return content;
}

export async function TasksEmail_Test(job: Job): Promise<Boolean> {
    try {
        const html = await getTemplateHTML();

        const { email } = job.data;

        const mailOptions: SendMailOptions = {
            to: email,
            from: EMAIL_USER,
            subject: `Teste`,
            html,
        };

        await EmailTransporterSend(mailOptions);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
