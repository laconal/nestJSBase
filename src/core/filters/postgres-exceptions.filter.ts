import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common'
import { DrizzleQueryError } from 'drizzle-orm'

@Catch(DrizzleQueryError)
export class PostgresExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    const response = host
      .switchToHttp()
      .getResponse();

    if (exception?.cause?.code === '23505') {
      return response.status(409).send({
        message: 'Unique constraint violation',
      });
    }

    return response.status(500).send({
      message: 'Internal server error',
    });
  }
}