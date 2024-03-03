import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";

export class ReturnPlanetsDto {

    @Type(() => String)
    @IsString()
    @ApiProperty()
    name: string

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
    rotation_period: number
	
	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	orbital_period: number

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	diameter: number

	@Type(() => String)
    @IsString()
    @ApiProperty()
	climate: string

	@Type(() => String)
    @IsString()
    @ApiProperty()
	gravity: string

	@Type(() => String)
    @IsString()
    @ApiProperty()
	terrain: string

	@Type(() => Number)
    @IsNumber()
    @ApiProperty()
	surface_water: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    population: number

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    residents: People[] | string[]

	@Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    films: Films[] | string[]
}