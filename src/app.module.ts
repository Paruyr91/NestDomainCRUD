import { DomainModule } from './domain/domain.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MONGODB_URI } from './utils/constants';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared-services/http-exception.filter';
import { DatabaseModule } from './database/dtabse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(MONGODB_URI, {
      useNewUrlParser: true,
      connectionFactory: (connection) => {
        mongoose.set('debug', true);
        return connection;
      },
    }),
    DatabaseModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
