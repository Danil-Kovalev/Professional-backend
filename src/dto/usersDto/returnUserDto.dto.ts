import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { Role } from "src/auth/roles/role.enum";

export class ReturnUserDto {
    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    username: string

    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    password: string

    @Type(() => String)
    @IsString()
    @ApiProperty({required: true, enum: ['Admin', 'User']})
    role: Role
}