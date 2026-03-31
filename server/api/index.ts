import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '@/app.module';
import * as express from 'express';
import { HttpStatusInterceptor } from '@/interceptors/http-status.interceptor';

let app: any;

async function bootstrap() {
  if (!app) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { logger: false }
    );

    nestApp.enableCors({
      origin: true,
      credentials: true,
    });
    nestApp.setGlobalPrefix('api');
    nestApp.use(express.json({ limit: '50mb' }));
    nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));
    nestApp.useGlobalInterceptors(new HttpStatusInterceptor());

    await nestApp.init();
    app = expressApp;
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  app(req, res);
}