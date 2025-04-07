// make a email service using resend and express js
import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.RESEND_API_KEY || 'resend_api_key';
// const resend = new Resend(API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);  

app.post('/send-email', async (req, res) => {

    
    try {
        console.log(req.body);
        const { to } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            secure: true,
            port: 465,
            auth: {
              user: 'resend',
              pass: API_KEY,
            },
          });
        
          const info = await transporter.sendMail({
            from: 'Nawafbinmohammed@anansky.sa',
            to: to,
            subject: 'Welcome to our newsletter',
            html: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #4e6df5;">Welcome to Anan Sky Newsletter!</h2>
                    <p>Thank you for signing up for the Anan Sky newsletter. We are excited to have you on board!</p>
                    <p>We will keep you updated with the latest news, updates, and exclusive content.</p>
                    <p>If you have any questions, feel free to reach out to us at <a href="mailto:Nawafbinmohammed@anansky.sa">Nawafbinmohammed@anansky.sa</a>.</p>
                    <p>Best regards,</p>
                    <p><strong>The Anan Sky Team</strong></p>
                  </div>
                </body>
              </html>
            `,
          });
        
          console.log('Message sent: %s', info.messageId);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});