import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export const transporter = nodemailer.createTransport(new SMTPTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: 'AKIAVBHONSQB7LEPDP4S',
      pass: 'BOPiUo6hQ2Eqdq20/JHcx3AcO8pO3mlieRgkWcpUBkgB'
    }
  }));