import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MONGODB_URI } from './utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(MONGODB_URI, {
      useNewUrlParser: true,
      connectionFactory: (connection) => {
        mongoose.set('debug', true);
        // connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
