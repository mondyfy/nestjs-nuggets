import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { UploadController } from './upload.controller';
import { Web3UploadService } from './services/web3_upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary.service';
import { S3Service } from './services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), NestjsFormDataModule],
  controllers: [UploadController],
  providers: [
    UploadService,
    Web3UploadService,
    CloudinaryService,
    CloudinaryProvider,
    S3Service,
  ],
})
export class UploadModule {}
