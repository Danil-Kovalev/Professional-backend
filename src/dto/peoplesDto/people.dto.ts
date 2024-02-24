import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Films } from "src/entity/films.entity";
import { FilmsDto } from "../filmsDto/films.dto";
import { PlanetsDto } from "../planetsDto/planets.dto";
import { Planets } from "src/entity/planets.entity";
import { SpeciesDto } from "../speciesDto/species.dto";
import { Species } from "src/entity/species.entity";
import { Vehicles } from "src/entity/vehicles.entity";
import { StarShipsDto } from "../starshipsDto/starships.dto";
import { Starships } from "src/entity/starships.entity";
import { VehiclesDto } from "../vehiclesDto/vehicles.dto";

export class PeopleDto {
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

    @Type(() => Array<PlanetsDto>)
    @IsArray()
    @ApiProperty()
    homeworld: Planets[]
    
    @Type(() => Array<FilmsDto>)
    @IsArray()
    @ApiProperty()
    films: Films[]

    @Type(() => Array<SpeciesDto>)
    @IsArray()
    @ApiProperty()
    species: Species[]

    @Type(() => Array<VehiclesDto>)
    @IsArray()
    @ApiProperty()
    vehicles: Vehicles[]

    @Type(() => Array<StarShipsDto>)
    @IsArray()
    @ApiProperty()
    starships: Starships[]
}