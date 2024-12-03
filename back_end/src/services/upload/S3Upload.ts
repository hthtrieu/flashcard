import fs from 'fs';
import { S3 } from 'aws-sdk';
import { Service } from 'typedi';
import { s3Config } from '../../core/config';

import { IUploadService } from './IUploadService';
@Service()
export class S3Upload implements IUploadService {
  // private s3 = new S3(s3Config);
  private s3 = new S3({
    endpoint: `${s3Config.endPoint}:${s3Config.port}`,
    // region: isMinIO ? undefined : s3Config.bucketRegion,
    accessKeyId: s3Config.accessKey,
    secretAccessKey: s3Config.secretKey,
    s3ForcePathStyle: true, // Quan trọng với MinIO
  });

  // async uploadImage(file: Express.Multer.File): Promise<string> {
  //   const blob = fs.readFileSync(file.path);
  //   const result = await this.s3
  //     .upload({
  //       Bucket: String(s3Config.bucketName),
  //       Body: blob,
  //       // Key: `${file.filename}`, //with .type aldready
  //       Key: `${Date.now()}_${file.originalname}`,
  //       ContentType: file.mimetype,
  //     })
  //     .promise();
  //   return result.Location;
  // }
  async uploadImage(file: Express.Multer.File): Promise<string> {
  const blob = fs.readFileSync(file.path);
  try {
    const result = await this.s3
      .upload({
        Bucket: String(s3Config.bucketName),
        Body: blob,
        Key: `${Date.now()}_${file.originalname}`,
        ContentType: file.mimetype,
      })
      .promise();

    const imageUrl = `${s3Config.endPoint}:${s3Config.port}/${s3Config.bucketName}/${result.Key}`;
    return imageUrl;
  } finally {
    // await fs.unlink(file.path);
  }
}

  uploadFile(file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
