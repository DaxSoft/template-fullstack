import { Job } from 'bullmq';
import { User } from '@prisma/client';
import { EMAIL_URL_ROUTE, EMAIL_USER } from '@/config/email/config';
import { EmailTransporterSend } from '@/config/email';
import { AssetsRotue, ClientPublicRoute } from '@/server/config/path';
import { SendMailOptions } from 'nodemailer';
import { UtilsEmailTemplateReplacer } from '@/libraries/email-template';

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

async function getTemplateHTML(userData: Omit<User, 'id'>): Promise<string> {
    const file = await AssetsRotue.io().read({
        routeName: 'email',
        filename: 'RegisterValidEmail.html',
    });
    const fileContent = file as string;

    const link_validation = `${EMAIL_URL_ROUTE}?token=${
        userData.tokenActiveAccount || ''
    }`;

    let content = await UtilsEmailTemplateReplacer(fileContent, {
        '{{name}}': userData.name,
        '{{link_validation}}': link_validation,
    });
    return content;
}

export async function TasksEmail_User_ValidAccount(job: Job): Promise<Boolean> {
    try {
        const data = job.data as User;

        const html = await getTemplateHTML(data);

        const mailOptions: SendMailOptions = {
            attachments: [
                {
                    cid: '@logo',
                    filename: 'email-logo.png',
                    path: ClientPublicRoute.plug('main', 'email-logo.png'),
                },
            ],
            to: data.email,
            from: EMAIL_USER,
            subject: `${data.name}, bem-vindo à Central da Bolsa`,
            // headers: {
            //     'Content-Type': 'text/html',
            // },
            html,
        };

        await EmailTransporterSend(mailOptions);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
