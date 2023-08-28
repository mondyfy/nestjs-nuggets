import { ApiProperty, PartialType } from '@nestjs/swagger';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class CreateUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsFile()
  @MaxFileSize(2.1e6) // 2MB
  @HasMimeType([
    'image/png',
    'image/jpeg',
    'application/pdf',
    'text/csv',
    'application/x-cfb', // docs
    'application/msword',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.ms-excel', // Excel files
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ])
  file?: any;
}

export class UploadInput {
  @ApiProperty({ type: 'string' })
  url: string;

  @ApiProperty({ type: 'string' })
  mimeType: string;

  @ApiProperty({ type: 'string' })
  provider: string;
}

export class UpdateUploadInput extends PartialType(UploadInput) {}
