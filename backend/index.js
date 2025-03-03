const dotenv = require("dotenv")
const express = require('express')
const cors = require("cors")
const nodemailer = require("nodemailer");

dotenv.config()
const app = express()
const PORT = 7777

const sendEmail = async (to, subject, textContent, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use Gmail's SMTP service
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
            logger: true,  // Enable debugging logs
            debug: true,
        });

        await transporter.sendMail({
            from: `"Portfolio Website" <${process.env.EMAIL_USER}>`, // Ensure this matches your Gmail address
            to,
            subject,
            text: textContent,
            html: htmlContent,
        });

        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};

// Middleware
const corsOptions = {
    origin: process.env.FRONT_END, // Replace with your frontend's origin
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions));
app.use(express.json())
// Serve static files from the 
// API Endpoint to send emails
app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                .container { max-width: 600px; background: #ffffff; padding: 20px; margin: 0 auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
                h2 { color: #333; }
                .details { margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #007BFF; }
                .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>New Contact Form Submission</h2>
                <p>You have received a new message from your website contact form.</p>
                <div class="details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        await sendEmail(
            "hamza_mohammed15@hotmail.com", // Replace with your own email
            `New Contact Form Submission from ${name}`,
            `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`, htmlContent
        );
        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
}) 