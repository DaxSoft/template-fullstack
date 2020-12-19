import nodemailer, { SendMailOptions } from 'nodemailer';

import * as EmailConfig from './config';

/*
:--------------------------------------------------------------------------
: Service
:--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport(
    {
        host: EmailConfig.EMAIL_HOST,
        port: EmailConfig.EMAIL_PORT,
        secure: false,
        auth: {
            user: EmailConfig.EMAIL_USER,
            pass: EmailConfig.EMAIL_PASSWORD,
        },
    },
    {
        from: EmailConfig.EMAIL_USER,
    }
);

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
        console.log(EmailConfig);
    } else {
        console.log('Server is ready to take our messages', success);
    }
});

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export { transporter as EmailTransporter };

export async function EmailTransporterSend(mailOptions: SendMailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('error is ' + error);
                resolve({
                    status: false,
                    info,
                });
            } else {
                console.log('Email sent: ' + info.response);
                resolve({
                    status: true,
                    info,
                });
            }
        });
    });
}
