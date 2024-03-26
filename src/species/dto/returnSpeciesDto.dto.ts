import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString } from "class-validator"
import { Films } from "src/films/entity/films.entity"
import { People } from "src/peoples/entity/people.entity"
import { Planets } from "src/planets/entity/planets.entity"

export class ReturnSpeciesDto {

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
    @IsString()
    @ApiProperty()
	planet: Planets | string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    language: string

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	people: People[] | string[]

	@Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	films: Films[] | string[]
}