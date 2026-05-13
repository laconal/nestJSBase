import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';
import { AtLeastOne } from 'src/core/utils/optionalFieldsValidator';
import {type UserType } from 'src/modules/auth/infrastructure/persistence/postgres/user-repository/user.model';
import { LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, PASSWORD_MIN_LENGTH, FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH, LASTNAME_MIN_LENGTH, LASTNAME_MAX_LENGTH, MIDDLENAME_MIN_LENGTH, MIDDLENAME_MAX_LENGTH } from 'src/shared/consts/contraints.consts';

export class UpdateUserDTO {
    @ApiProperty()
    @IsInt()
    @Min(1)
    id: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(FIRSTNAME_MIN_LENGTH)
    @MaxLength(FIRSTNAME_MAX_LENGTH)
    firstName?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(LASTNAME_MIN_LENGTH)
    @MaxLength(LASTNAME_MAX_LENGTH)
    lastName?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(MIDDLENAME_MIN_LENGTH)
    @MaxLength(MIDDLENAME_MAX_LENGTH)
    middleName?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Matches(/^\d{14}$/, {
        message: "PINFL has to contain exactly 14 digits (0-9)"
    })
    pinfl?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['internal', 'external'])
    type?: UserType

    @AtLeastOne(["firstName", "lastName", "middleName", "pinfl", "type"], {
          message: "Provide at least one field to update"
        })_atLesatOne: any
}