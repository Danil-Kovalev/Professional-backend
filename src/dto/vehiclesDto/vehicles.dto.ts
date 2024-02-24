import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString } from "class-validator"
import { PeopleDto } from "../peoplesDto/people.dto"
import { FilmsDto } from "../filmsDto/films.dto"
import { People } from "src/entity/people.entity"
import { Films } from "src/entity/films.entity"

export class VehiclesDto {
    
    @Type(() => String)
    @IsString()
    @ApiProperty()
    name: string

	@Type(() => String)
    @IsString()
    @ApiProperty()
    model: string
	
	@Type(() => String)
    @IsString()
    @ApiProperty()
	manufacturer: string

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	cost_in_credits: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
	length: number

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	max_atmosphering_speed: number

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	crew: number

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	passengers: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    cargo_capacity: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    consumables: string

    @Type(() => Array<PeopleDto>)
    @IsArray()
    @ApiProperty()
	pilots: People[]

	@Type(() => Array<FilmsDto>)
    @IsArray()
    @ApiProperty()
	films: Films[]
}