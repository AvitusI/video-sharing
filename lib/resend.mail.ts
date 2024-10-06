import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface sendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: sendEmailProps) {
  await resend.emails.send({
    from: "send@avytechs.tech",
    to,
    subject,
    html,
  });
}
