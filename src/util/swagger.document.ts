import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

//SwaggerModule.setup('api-docs', app, document);의 코드에서 setup() 메서드를 통해서 
// Swagger UI를 마운트 하는 경로를 설정할 수 있다. 
// 브라우저에서 http://localhost:3000/api-docs로 이동하면 Swagger UI가 표시된다.