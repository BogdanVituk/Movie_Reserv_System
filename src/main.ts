import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000

  const config = new DocumentBuilder()
      .setTitle("Movie Reservation System")
      .setDescription("Документація REST API")
      .setVersion('1.0.0')
      .addTag("Vityuk Production")
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs',app, document)

  await app.listen(port, () => console.log(`app start is port ${port}`));
}
bootstrap();
