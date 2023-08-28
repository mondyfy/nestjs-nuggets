import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3Storage, File } from 'web3.storage';

@Injectable()
export class Web3UploadService {
  constructor(private readonly configService: ConfigService) {}

  makeStorageClient() {
    return new Web3Storage({
      token: this.configService.get('WEB3_STORAGE_API_KEY'),
    });
  }

  async fileFromBuffer(file: any, fileName: string) {
    const files = [new File([file.buffer], fileName)];
    return files;
  }

  async storeFiles(file: any) {
    const client = this.makeStorageClient();
    const cid = await client.put(file);
    Logger.log('stored files with cid:', cid);
    return cid;
  }

  async uploadToWeb3Storage(file: any) {
    const fileName = `${new Date().getTime()}_${file.originalName.replaceAll(
      ' ',
      '',
    )}`;
    const fileObj = await this.fileFromBuffer(file, fileName);
    const fileCid = await this.storeFiles(fileObj);
    return `https://${fileCid}.ipfs.w3s.link/${fileName}`;
  }
}
