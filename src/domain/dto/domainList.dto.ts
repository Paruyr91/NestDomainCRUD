import { ApiProperty } from '@nestjs/swagger';
import { DomainDto } from './domain.dto';

export class DomainListDto {
  @ApiProperty()
  domains: DomainDto[];

  @ApiProperty()
  total: number;
}
