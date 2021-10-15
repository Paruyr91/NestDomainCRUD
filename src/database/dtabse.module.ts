import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from './schemas/domain.schema';

const dbModels = MongooseModule.forFeature([
  { name: Domain.name, schema: DomainSchema },
]);

@Global()
@Module({
  imports: [dbModels],
  exports: [dbModels],
})
export class DatabaseModule {}
