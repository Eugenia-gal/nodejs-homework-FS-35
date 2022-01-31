import sgMail from "@sendgrid/mail";

class SenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    return await sgMail.send({ ...msg, from: process.env.SENDGRID_SENDER });
  }
}

export default SenderSendGrid;
