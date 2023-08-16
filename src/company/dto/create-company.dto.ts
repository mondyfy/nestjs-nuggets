import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  @ApiPropertyOptional()
  isActive?: boolean;
}
