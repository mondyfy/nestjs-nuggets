import { Injectable, Logger } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  public async uploadFile(
    file: any,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    Logger.log('Uploading file to cloudinary');
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
