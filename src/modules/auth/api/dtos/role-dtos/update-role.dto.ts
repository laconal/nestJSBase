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
import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH } from 'src/shared/consts/contraints.consts';
import { AtLeastOne } from 'src/core/utils/optionalFieldsValidator';

export class UpdateRoleDTO {
    @ApiProperty({example: 1})
    @IsInt()
    @Min(1)
    id: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(NAME_MIN_LENGTH)
    @MaxLength(NAME_MAX_LENGTH)
    name?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(DESCRIPTION_MAX_LENGTH)
    description?: string

    @ApiPropertyOptional({type: [Number]})
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({each: true})
    @Min(1, {each: true})
    permissions?: number[]

    @AtLeastOne(["name", "description", "permissions"], {
      message: "Provide at least one field to update"
    })_atLesatOne: any
}