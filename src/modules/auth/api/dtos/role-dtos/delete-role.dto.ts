import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsArray,
  Min,
  ArrayMinSize,
} from 'class-validator';

export class DeleteRoleDTO {
    @ApiProperty({type: [Number]})
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({each: true})
    @Min(1, {each: true})
    ids: number[]
}