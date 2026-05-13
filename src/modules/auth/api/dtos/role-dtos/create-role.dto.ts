import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  Min,
  MinLength,
  MaxLength,
  ArrayMinSize,
} from 'class-validator';
import { Type } from "class-transformer"
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from 'src/shared/consts/contraints.consts';

export class CreateRoleDTO {
    @ApiProperty()
    @IsString()
    @MinLength(NAME_MIN_LENGTH)
    @MaxLength(NAME_MAX_LENGTH)
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(DESCRIPTION_MAX_LENGTH)
    description?: string

    @ApiProperty({type: [Number]})
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({each: true})
    @Min(1, {each: true})
    permissions: number[]
}