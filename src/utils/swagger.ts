import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestApplication } from '@nestjs/core';

export default class Swagger {
  document: SwaggerModule;
  app: NestApplication;
  constructor(app) {
    this.app = app;
    const options = new DocumentBuilder()
      .setTitle('Domain CRUD API')
      .setDescription('Test API ')
      .setVersion('0.0.1')
      .build();
    this.document = SwaggerModule.createDocument(app, options);
  }
  setup() {
    return SwaggerModule.setup(
      'swagger',
      this.app,
      <OpenAPIObject>this.document,
    );
  }
}
