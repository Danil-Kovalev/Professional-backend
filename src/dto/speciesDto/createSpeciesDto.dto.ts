import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString } from "class-validator"

export class CreateSpeciesDto {

    @Type(() => String)
    @IsString()
    @ApiProperty()
    name: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    classification: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    designation: string

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    average_heigh: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    skin_colors: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    eye_colors: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    hair_colors: string

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    average_lifespan: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
	planetsIds: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    language: string

    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
	peopleIds: number[]

	@Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
	filmsIds: number[]
}