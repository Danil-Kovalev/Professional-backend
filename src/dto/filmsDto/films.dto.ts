import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString } from "class-validator"
import { PeopleDto } from "../peoplesDto/people.dto"
import { SpeciesDto } from "../speciesDto/species.dto"
import { PlanetsDto } from "../planetsDto/planets.dto"
import { StarShipsDto } from "../starshipsDto/starships.dto"
import { VehiclesDto } from "../vehiclesDto/vehicles.dto"
import { People } from "src/entity/people.entity"
import { Starships } from "src/entity/starships.entity"
import { Vehicles } from "src/entity/vehicles.entity"
import { Species } from "src/entity/species.entity"
import { Planets } from "src/entity/planets.entity"

export class FilmsDto {
    
    @Type(() => String)
    @IsString()
    @ApiProperty()
    title: string

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    episode_id: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    opening_crawl: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    director: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    producer: string

    @Type(() => String)
    @IsString()
    @ApiProperty()
    release_date: Date

    @Type(() => Array<PeopleDto>)
    @IsArray()
    @ApiProperty()
    characters: People[]

    @Type(() => Array<StarShipsDto>)
    @IsArray()
    @ApiProperty()
	starships: Starships[]

    @Type(() => Array<VehiclesDto>)
    @IsArray()
    @ApiProperty()
	vehicles: Vehicles[]

    @Type(() => Array<SpeciesDto>)
    @IsArray()
    @ApiProperty()
	species: Species[]
	
    @Type(() => Array<PlanetsDto>)
    @IsArray()
    @ApiProperty()
    planets: Planets[]
}