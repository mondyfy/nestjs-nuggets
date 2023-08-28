import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'uploads' })
export class Upload {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar', length: 255, unique: true })
  url: string;

  @ApiProperty({ type: 'string' })
  @Column({ name: 'mime_type', type: 'varchar' })
  mimeType: string;
}
