import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from "class-transformer"

export class GetRolesDTO {
    @ApiPropertyOptional({default: 1})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1

    @ApiPropertyOptional({default: 100})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    pageSize: number = 100
}