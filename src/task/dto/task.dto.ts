import { ApiProperty } from '@nestjs/swagger';

export class CronDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number, required: false })
  seconds?: number;
}
