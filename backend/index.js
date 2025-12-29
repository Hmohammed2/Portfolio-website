import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { ConfidentialClientApplication } from "@azure/msal-node";

dotenv.config();
const app = express();
const PORT = 7777;

const msal = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
    clientSecret: process.env.MS_CLIENT_SECRET,
  },
});

async function getToken() {
  const result = await msal.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return result.accessToken;
}

export async function sendEmail(to, subject, text, html) {
  const token = await getToken();

  const client = Client.init({
    authProvider: (done) => done(null, token),
  });

  return client.api(`/users/${process.env.MS_SENDER}/sendMail`).post({
    message: {
      subject,
      body: { contentType: "HTML", content: html },
      toRecipients: [{ emailAddress: { address: to } }],
    },
    saveToSentItems: true,
  });
}

// Middleware
const allowedOrigins = [
  "http://localhost:5001", // local frontend dev
  "http://localhost", // local frontend dev
  "https://hamzamohammed.com", // production domain
  "https://www.hamzamohammed.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server / curl / Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  })
);
app.use(express.json());
// Serve static files from the
// API Endpoint to send emails
app.post("/api/send-email", async (req, res) => {
  const { name, email, company, role, volume, message } = req.body;

  if (!company || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Honeypot field (bot killer)
  if (req.body.website) return res.status(200).json({ success: true });

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
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Company Volume:</strong> ${volume}</p>
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
      "hamza_mohammed15@hotmail.com",
      `New Lead – ${company}`,
      `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      htmlContent
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at: ${PORT}`);
});
