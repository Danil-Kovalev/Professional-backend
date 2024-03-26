import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"
import { People } from "src/peoples/entity/people.entity"
import { Planets } from "src/planets/entity/planets.entity"
import { Species } from "src/species/entity/species.entity"
import { Starships } from "src/starships/entity/starships.entity"
import { Vehicles } from "src/vehicles/entity/vehicles.entity"

export class ReturnFilmsDto {
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

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    characters: People[] | string[]

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	starships: Starships[] | string[]

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	vehicles: Vehicles[] | string[]

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	species: Species[] | string[]
	
    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    planets: Planets[] | string[]
}