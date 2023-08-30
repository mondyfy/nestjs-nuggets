import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class S3Service {
  private awsService = null;
  constructor(private readonly configService: ConfigService) {
    this.awsService = new S3({
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
    });
  }

  public async uploadFile(file: any, filename?: string) {
    Logger.log(
      `Uploading file to s3 bucket: ${this.configService.get(
        'AWS_S3_BUCKET_NAME',
      )}`,
    );
    try {
      const [originalFileName, ext] = file.originalName.split('.') ?? [];
      const filenNameWithoutSpace = originalFileName.replaceAll(' ', '');

      const fileName = filename
        ? filename + filenNameWithoutSpace + '.' + ext
        : filenNameWithoutSpace + `_${new Date().getTime()}.${ext}`;

      const params = {
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
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
          Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
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
