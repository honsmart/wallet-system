// src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AtGuard } from './accounts/common/guards';
import { docs } from 'src/accounts/docs/api.docs'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = '3003'
  const localurl = 'http://localhost:'
  const onlineUrl = 'vercel.com/'

  // const reflector = new Reflector()
  // app.useGlobalGuards(new AtGuard(reflector))
  const config = new DocumentBuilder()
    .setTitle('Wallet service')
    .setDescription("" + docs)
    .setContact('Adgboye Adedeji Opeyemi', 'https://github.com/honsmart', 'adegboyeopeyemi580@gmail.com')
    .addServer(localurl + port)
    .addServer(onlineUrl)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .setVersion('0.1')

    .build();

    

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  await app.listen(port);
}
bootstrap();