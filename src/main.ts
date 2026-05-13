import "./instrument"
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { PostgresExceptionFilter } from './core/filters/postgres-exceptions.filter';
import { MetricsService } from './core/metrics/metrics.service';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  app.useLogger(app.get(Logger))
  const metricsService = app.get(MetricsService);

  adapter.getInstance().addHook('onResponse', (request, reply, done) => {
    metricsService.httpRequestsTotal.inc({
      method: request.method,
      route: request.routeOptions?.url ?? request.url.split('?')[0],
      status: reply.statusCode,
    });
    done();
  });

  app.setGlobalPrefix("api/v1")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )

  app.enableCors({
    origin: true,
    credentials: true
  })

  app.useGlobalFilters(new PostgresExceptionFilter())

  await app.register(fastifyCookie)

  const config = new DocumentBuilder().build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true
    }
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();