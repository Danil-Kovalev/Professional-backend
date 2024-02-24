import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreatePeopleDto {
    @Type(() => String)
    @IsString()
    @ApiProperty()
    name: string

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    height: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    mass: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    hair_color: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    skin_color: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    eye_color: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    birth_year: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    gender: string

    @Type(() => Array<number>)
    @IsArray()
    @ApiProperty()
    homeworldIds: number[]
    
    @Type(() => Array<number>)
    @IsArray()
    @ApiProperty()
    filmsIds: number[]

    @Type(() => Array<number>)
    @IsArray()
    @ApiProperty()
    speciesIds: number[]

    @Type(() => Array<number>)
    @IsArray()
    @ApiProperty()
    vehiclesIds: number[]

    @Type(() => Array<number>)
    @IsArray()
    @ApiProperty()
    starshipsIds: number[]

}