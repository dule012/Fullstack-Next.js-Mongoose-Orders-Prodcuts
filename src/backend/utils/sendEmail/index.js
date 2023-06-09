import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, subject, text, html }) => {
  const msg = { to, from: process.env.SENDER_EMAIL, subject, text, html };
  return sendgrid.send(msg);
};

export default sendEmail;
