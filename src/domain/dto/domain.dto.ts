import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DomainDto {
  _id?: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  domainName: string;

  @ApiProperty()
  @IsOptional()
  ownerName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsMongoId()
  ownerId: Types.ObjectId;
}
