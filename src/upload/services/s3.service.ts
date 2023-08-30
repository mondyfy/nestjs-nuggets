import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

@Injectable()
export class S3Service {
  private awsService = null;
  constructor() {
    this.awsService = new S3({
      accessKeyId: configService.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
    });
  }

  public async uploadFile(file: any, filename?: string) {
    Logger.log(
      `Uploading file to s3 bucket: ${configService.get('AWS_S3_BUCKET_NAME')}`,
    );
    try {
      const ext = file.originalName
        ? file.originalName.split('.')[1]
        : file.originalname.split('.')[1];
      const originalFIleName = file.originalName
        ? file.originalName.split('.')[0]
        : file.originalname.split('.')[0];

      const fileName = filename
        ? filename + originalFIleName + '.' + ext
        : originalFIleName + `_${new Date().getTime()}.${ext}`;

      const params = {
        Bucket: configService.get('AWS_S3_BUCKET_NAME'),
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const res: any = await new Promise((resolve, reject) => {
        this.awsService.upload(params, (err, data) =>
          err == null ? resolve(data) : reject(err),
        );
      });

      return res.Location;
    } catch (err) {
      throw err;
    }
  }

  public async deleteFile(fileUrl: string) {
    Logger.debug(`Deleting file: ${fileUrl} from s3`);
    const words = fileUrl.split('/');
    const Key = words[words.length - 1];

    const res: any = await new Promise((resolve, reject) => {
      this.awsService.deleteObject(
        {
          Bucket: configService.get('AWS_S3_BUCKET'),
          Key,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
    return res;
  }

  public async updateFile(fileUrl: string, file: any) {
    Logger.debug(`Updating file: ${fileUrl} in s3`);

    if (fileUrl && fileUrl.length > 2) {
      await this.deleteFile(fileUrl);
    }
    return await this.uploadFile(file);
  }
}
