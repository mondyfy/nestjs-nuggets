import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './services/upload.service';
import { Web3UploadService } from './services/web3_upload.service';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { S3Service } from './services/s3.service';

describe('UploadController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        UploadService,
        Web3UploadService,
        CloudinaryService,
        CloudinaryProvider,
        S3Service,
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
