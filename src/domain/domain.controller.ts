import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { DomainDto } from './dto/domain.dto';
import { DomainListDto } from './dto/domainList.dto';
import {
  DomainParamsDto,
  DomainQueryDto,
  DomainSearchQueryDto,
  OwnerParamsDto,
} from './dto/domainQuery.dto';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  createDomain(@Body() domain: DomainDto) {
    return this.domainService.createDomain(domain);
  }

  @Get()
  getAllDomains(@Query() query: DomainQueryDto): Promise<DomainListDto> {
    return this.domainService.getAllDomains(query);
  }

  @Put('/:domainId')
  @ApiParam({
    name: 'domainId',
    type: 'string',
    required: true,
    description: 'enter MongoId',
  })
  updateDomainById(
    @Body() domain: DomainDto,
    @Param() params: DomainParamsDto,
  ) {
    domain._id = params.domainId;
    return this.domainService.updateDomain(domain);
  }

  @Get('/byOwner/:ownerId')
  @ApiParam({
    name: 'ownerId',
    type: 'string',
    required: true,
    description: 'enter MongoId',
  })
  getOwnersAllDomains(@Param() params: OwnerParamsDto): Promise<DomainDto[]> {
    return this.domainService.getOwnersAllDomains(params.ownerId);
  }

  @Post('/search/')
  domainsFuzzySearch(
    @Query() query: DomainSearchQueryDto,
  ): Promise<DomainDto[]> {
    return this.domainService.domainsFuzzySearch(query.q);
  }
}
