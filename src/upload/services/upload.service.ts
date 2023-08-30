import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadInput } from '../dto/create-upload.dto';
import { UpdateUploadDto } from '../dto/update-upload.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../entities/upload.entity';
import { S3Service } from './s3.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,

    @InjectRepository(Upload)
    private repo: Repository<Upload>,
  ) {}

  async create(input: UploadInput) {
    return this.repo.save(input);
  }

  async findAll() {
    return this.repo.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  async remove(id: number) {
    const exists = await this.findOne(id);
    if (exists?.url && exists.provider === 's3') {
      await this.s3Service.deleteFile(exists.url);
    }
    if (!exists) {
      return new NotFoundException('File not found.');
    }
    return this.repo.delete(id);
  }
}
