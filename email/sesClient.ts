import { SESClientConfig, SESClient } from "@aws-sdk/client-ses";

let sesClient: SESClient;

if (process.env.NODE_ENV === "production") {
  if (!process.env.AWS_API_KEY || !process.env.AWS_SECRET_KEY) {
    console.error("SES api keys not provided");
  }
  const SES_CONFIG: SESClientConfig = {
    credentials: {
      accessKeyId: process.env.AWS_API_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  };
  sesClient = new SESClient(SES_CONFIG);
} else {
  if (!global.sesClient) {
    if (!process.env.AWS_API_KEY || !process.env.AWS_SECRET_KEY) {
      console.error("SES api keys not provided");
    }
    const SES_CONFIG: SESClientConfig = {
      credentials: {
        accessKeyId: process.env.AWS_API_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_API_KEY as string,
      },
    };
    sesClient = new SESClient(SES_CONFIG);
  } else {
    if (!global.sesClient) {
      if (!process.env.AWS_API_KEY || !process.env.AWS_SECRET_API_KEY) {
        console.error("SES api keys not provided");
      }
      const SES_CONFIG: SESClientConfig = {
        credentials: {
          accessKeyId: process.env.AWS_API_KEY as string,
          secretAccessKey: process.env.AWS_SECRET_API_KEY as string,
        },
    };
    global.sesClient = new SESClient(SES_CONFIG);
    
}
  sesClient = global.sesClient;
}

export default sesClient;
