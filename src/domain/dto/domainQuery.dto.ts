import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class DomainQueryDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  offset?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size?: number;
}

export class DomainParamsDto {
  @IsNotEmpty()
  @IsMongoId()
  domainId?: Types.ObjectId;
}

export class OwnerParamsDto {
  @IsNotEmpty()
  @IsMongoId()
  ownerId?: Types.ObjectId;
}

export class DomainSearchQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  q: string;
}
