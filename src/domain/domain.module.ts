import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
