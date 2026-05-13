import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsArray,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from "class-transformer"

export class AssignRevokeRoleDTO {
    @ApiProperty({type: [Number], example: [1]})
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({each: true})
    @Min(1, {each: true})
    roleIDs: number[]

    @ApiProperty({type: [Number], example: [1]})
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({each: true})
    @Min(1, {each: true})
    userIDs: number[]
}