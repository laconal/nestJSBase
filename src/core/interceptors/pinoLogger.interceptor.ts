import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';

export const pinoConfig: LoggerModuleAsyncParams = {
    imports: [ConfigModule],
    useFactory: () => ({
        pinoHttp: {
            level: 'info',
            customLogLevel: (res, err) => {
                if (err || res.statusCode >= 500) return 'error';
                if (res.statusCode >= 400) return 'warn';
                return 'info';
            },
            customSuccessMessage: (req, res) =>
                `${req.method} ${req.url} -> ${res.statusCode}`,
            customErrorMessage: (req, res, err) =>
                  `ERROR ${req.method} ${req.url} -> ${res.statusCode}: 
                      ${err?.message}`,
            serializers: {
                req(req) {
                    return {
                        method: req.method,
                        url: req.url,
                    };
                },
                res(res) {
                    return {
                        statusCode: res.statusCode,
                        responseTime: res.responseTime,
                    };
                },
                err(err) {
                    if (!err) return undefined;
                    return {
                        type: err.type,
                        message: err.message,
                        stack: err.stack, 
                    };
                },
            },
            transport: {
                targets: [
                    {
                        target: 'pino-loki',
                        options: {
                            host: process.env.LOKI_URL,
                            json: true,
                            batch: true,
                            labels: { app: 'nestjs-loki-grafana' },
                            silenceErrors: false
                        }
                    },
                ]
                
            },
        },
    }),
    inject: [ConfigService],
};