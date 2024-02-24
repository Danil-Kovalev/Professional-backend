import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { PeopleDto } from "../peoplesDto/people.dto";
import { PlanetsDto } from "../planetsDto/planets.dto";
import { FilmsDto } from "../filmsDto/films.dto";
import { Planets } from "src/entity/planets.entity";
import { People } from "src/entity/people.entity";
import { Films } from "src/entity/films.entity";

export class SpeciesDto {
    
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
    hair_colors: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    eye_colors: string

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    average_lifespan: number

    @Type(() => PlanetsDto)
    @ApiProperty()
	planets: Planets

    @Type(() => String)
    @IsString()
    @ApiProperty()
    language: string

    @Type(() => Array<PeopleDto>)
    @IsArray()
    @ApiProperty()
	people: People[]

	@Type(() => Array<FilmsDto>)
    @IsArray()
    @ApiProperty()
	films: Films[]
}