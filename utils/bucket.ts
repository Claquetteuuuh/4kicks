import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const deleteFile = async (bucketName: string, filename: string) => {
  const params = {
    Bucket: bucketName,
    Key: filename,
  };

  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    return;
  }

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3.send(command);
    if (!response) {
      return;
    }
  } catch (err: any) {
    console.error(err);
  }
};

export const createBucket = async (bucketName: string) => {
  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    return;
  }
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  console.log(`Creating Bucket ${bucketName}`);

  const command = new CreateBucketCommand({ Bucket: bucketName });
  try {
    const returnData = await s3.send(command);
    console.log(`Created Bucket ${bucketName}`);
    console.log(returnData);
  } catch (error: any) {
    if (error.name === "BucketAlreadyOwnedByYou") {
      console.log(`Bucket ${bucketName} already created`);
    } else {
      console.error(`Error created bucket ${bucketName}`, error);
    }
  }
};

export const uploadFile = async (
  bucketName: string,
  fileName: string,
  fileContent: Buffer,
  contentType: string
) => {
  console.log(`Uploading File ${fileName} to bucket ${bucketName}`);
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: contentType,
  });

  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    return;
  }
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    const returnData = await s3.send(command);
    console.log(`File ${fileName} uploaded to  bucket ${bucketName}`);
  } catch (error) {
    console.error(
      `Error uploading file ${fileName} to bucket ${bucketName}`,
      error
    );
  }
};
