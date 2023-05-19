import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger.document';
import * as config from "config";
import { HttpExceptionFilter } from './util/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server')
  const port = serverConfig.port
  
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);
  
  await app.listen(port);
}
bootstrap();
