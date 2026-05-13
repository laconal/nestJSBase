import { Module } from '@nestjs/common';
import { SentryModule } from "@sentry/nestjs/setup"
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { authDatabaseSchemaPaths, AuthModule } from './modules/auth/auth.module';
import { MetricsModule } from './core/metrics/metrics.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './core/interceptors/pinoLogger.interceptor';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    LoggerModule.forRootAsync(pinoConfig),
    MetricsModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter
    }
  ]
})

export class AppModule {}

export const databaseModelSchemas = [
  ...authDatabaseSchemaPaths,
]