import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {


    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>("EMAIL_USER"),
                pass: this.configService.get<string>("EMAIL_PASS")
            },
        })
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions =  {
            from: 'movieReserv@gmail.com',
            to,
            subject,
            text
        }

        try {
            await this.transporter.sendEmail(mailOptions)
            console.log(`Email sent to ${to}`)
        } catch(err) {
            console.error(`Failed to send email to ${to}:`, err)
        }
    }
}
