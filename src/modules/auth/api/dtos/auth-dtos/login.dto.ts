import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH } from 'src/shared/consts/contraints.consts';

export class LoginDTO {
    @ApiProperty()
    @IsString()
    @MinLength(LOGIN_MIN_LENGTH)
    @MaxLength(LOGIN_MAX_LENGTH)
    login: string

    @ApiProperty()
    @IsString()
    password: string
}