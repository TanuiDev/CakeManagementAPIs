import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter;

// Skip real emails when testing
if (process.env.NODE_ENV === "test") {
  transporter = {
    sendMail: async (options: any) => {
      console.log("📨 [TEST MODE] Email would be sent to:", options.to);
      return { accepted: [options.to], rejected: [] }; // mock response
    },
  };
} else {
  //Real transporter for dev & production
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

export const sendEmail = async (to: string, subject: string, html?: string) => {
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    };

    const mailRes = await transporter.sendMail(mailOptions);
    console.log("📤 Message sent:", mailRes);

    if (mailRes.accepted?.length > 0) return "Email sent successfully";
    if (mailRes.rejected?.length > 0) return "Email not sent";

    return "Email server not responding";
  } catch (error: any) {
    console.log(" Error sending email:", error.message);
    return JSON.stringify(error.message);
  }
};
