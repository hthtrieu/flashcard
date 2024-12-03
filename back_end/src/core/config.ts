import dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_KEY),
  authDomain: String(process.env.AUTH_DOMAIN),
  projectId: String(process.env.PROJECT_ID),
  storageBucket: String(process.env.STORAGE_BUCKET),
  messagingSenderId: String(process.env.MESSAGING_SENDER_ID),
  appId: String(process.env.APP_ID),
  // measurementId: String(process.env.MEASUREMENT_ID),
};

export const s3Config = {
  accessKey: process.env.AWS_S3_ACCESS_KEY_ID as string,
  secretKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  bucketName: process.env.AWS_S3_BUCKET_NAME as string,
  bucketRegion: process.env.AWS_S3_BUCKET_REGION as string,
  //minio
  endPoint: String(process.env.MINIO_ENDPOINT) as string,
  port: Number(process.env.MINIO_PORT) as number,
  useSSL: Boolean(process.env.useSSL) || false,
};

export const tokenConfig = {
  algorithm: 'HS256',
  expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
};
