import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { UploadController } from './upload.controller';
import { Web3UploadService } from './services/web3_upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), NestjsFormDataModule],
  controllers: [UploadController],
  providers: [UploadService, Web3UploadService],
})
export class UploadModule {}
