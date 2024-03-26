import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { Role } from "src/auth/roles/role.enum";

export class UserDto {
    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    username: string

    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    password: string
}