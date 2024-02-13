import nodemailer from 'nodemailer';
import APIError from './errors.js'

const sendMail = (mailOptions) => {
    const transporter =  nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
            throw new APIError("Mail Gönderilemedi !")
        }
        console.log("info : ",info);
        return true
    })
}

export default sendMail;