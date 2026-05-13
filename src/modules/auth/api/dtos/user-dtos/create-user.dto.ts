import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';
import {type UserType } from 'src/modules/auth/infrastructure/persistence/postgres/user-repository/user.model';
import { LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, PASSWORD_MIN_LENGTH, FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH, LASTNAME_MIN_LENGTH, LASTNAME_MAX_LENGTH, MIDDLENAME_MIN_LENGTH, MIDDLENAME_MAX_LENGTH } from 'src/shared/consts/contraints.consts';

export class CreateUserDTO {
    @ApiProperty({example: "Eva"})
    @IsString()
    @MinLength(LOGIN_MIN_LENGTH)
    @MaxLength(LOGIN_MAX_LENGTH)
    login: string

    @ApiProperty({example: "second"})
    @IsString()
    @MinLength(PASSWORD_MIN_LENGTH)
    password: string

    @ApiProperty({example: "Adam's"})
    @IsString()
    @MinLength(FIRSTNAME_MIN_LENGTH)
    @MaxLength(FIRSTNAME_MAX_LENGTH)
    firstName: string

    @ApiProperty({example: "rib"})
    @IsString()
    @MinLength(LASTNAME_MIN_LENGTH)
    @MaxLength(LASTNAME_MAX_LENGTH)
    lastName: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(MIDDLENAME_MIN_LENGTH)
    @MaxLength(MIDDLENAME_MAX_LENGTH)
    middleName?: string

    @ApiProperty({example: "12345678901234"})
    @IsString()
    @Matches(/^\d{14}$/, {
        message: "PINFL has to contain exactly 14 digits (0-9)"
    })
    pinfl: string

    @ApiPropertyOptional({ enum: ['internal', 'external'], default: 'internal' })
    @IsOptional()
    @IsString()
    @IsIn(['internal', 'external'])
    @Transform(({ value }) => value ?? 'internal')
    type?: UserType
}