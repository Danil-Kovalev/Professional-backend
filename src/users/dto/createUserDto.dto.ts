import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateUserDto {
    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    username: string

    @Type(() => String)
    @IsString()
    @ApiProperty({required: true})
    password: string
}