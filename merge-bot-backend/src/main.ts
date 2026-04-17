import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Capture raw request body for signature verification
  app.use(bodyParser.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
