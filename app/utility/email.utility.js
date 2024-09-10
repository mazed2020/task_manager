import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY_KEY, EMAIL_USER} from "../config/config.js";
import * as tls from "node:tls";

export const sendEmail = async (EmailTo,EmailText,EmailSubject) => {

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure:EMAIL_SECURITY_KEY, // true for port 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
            tls:{
                rejectUnauthorized:false
            }
    });
    const mailOptions = {
        from:'Task manager MERN <info@teamrabbil.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText,
    }
return transporter.sendMail(mailOptions);
}