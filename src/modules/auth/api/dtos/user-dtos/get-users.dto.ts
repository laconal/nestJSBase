import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

export class GetUsersDTO {
  @ApiPropertyOptional({
    example: '1,2,3,4',
    description: 'Comma-separated user IDs',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+(,\d+)*$/, {
    message: 'ids must contain only digits separated by commas',
  })
  ids?: string;

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