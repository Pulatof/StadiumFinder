import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('Stadium finder')
      .setDescription('Mini project for stadium finder')
      .setVersion('1.0.0')
      .addTag('Nodejs, Nestjs, Postgres, Sequelize, Jwt, Swagger')
      .build();
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document)
    app.use(cookieParser())
    app.setGlobalPrefix('api')  
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => {
      console.log(`Server ${PORT} - postda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
