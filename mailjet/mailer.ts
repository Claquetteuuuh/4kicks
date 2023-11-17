import Mailjet from "node-mailjet";

let mailer: Mailjet | undefined;

if (process.env.NODE_ENV === "production") {
  if (process.env.MAIL_API_KEY && process.env.MAIL_SECRET_KEY) {
    mailer = Mailjet.apiConnect(
      process.env.MAIL_API_KEY,
      process.env.MAIL_SECRET_KEY
    );
  } else {
    console.error("Mailer api key and secret are not defined");
  }
} else {
  if (!global.mailer) {
    if (process.env.MAIL_API_KEY && process.env.MAIL_SECRET_KEY) {
      global.mailer = Mailjet.apiConnect(
        process.env.MAIL_API_KEY,
        process.env.MAIL_SECRET_KEY
      );
    } else {
      console.error("Mailer api key and secret are not defined");
    }
  }
  mailer = global.mailer;
}

export default mailer;
