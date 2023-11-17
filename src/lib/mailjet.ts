import mailer from "../../mailjet/mailer";

export type MailjetContentType = {
  subject: string;
  text: string;
  html?: string;
};

export type MailjetTargetType = {
  email: string;
  name: string;
};

export type MailjetAuthorType = {
  email: string;
  name: string;
};

export const sendMail = (
  author: MailjetAuthorType,
  target: MailjetTargetType,
  content: MailjetContentType
) => {
  mailer?.post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: author.email,
            Name: author.name,
          },
          To: [
            {
              Email: target.email,
              Name: target.name,
            },
          ],
          Subject: content.subject,
          TextPart: content.text,
          HTMLPart: content.html,
        },
      ],
    })
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err);
    });
};
