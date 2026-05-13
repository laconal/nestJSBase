import { Module } from '@nestjs/common';
import { DrizzleProvider } from 'src/core/database/drizzle.provider';

@Module({
    providers: [DrizzleProvider],
    exports: [DrizzleProvider],
})
export class DatabaseModule {}
