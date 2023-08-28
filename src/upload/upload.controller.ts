import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { CreateUploadDto, UploadInput } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { Web3UploadService } from './services/web3_upload.service';
import { Upload } from './entities/upload.entity';

@ApiTags('upload')
@Controller('upload')
@FormDataRequest()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly web3UploadService: Web3UploadService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The file has been uploaded successfully',
    type: Upload,
  })
  async create(@Body() createUploadDto: CreateUploadDto) {
    const { file } = createUploadDto;
    try {
      const fileUrl = await this.web3UploadService.uploadToWeb3Storage(file);
      const uploadInfo: UploadInput = {
        url: fileUrl,
        mimeType: file.busBoyMimeType,
      };

      await this.uploadService.create(uploadInfo);
      return uploadInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
