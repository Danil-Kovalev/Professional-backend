import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Films } from "src/films/entity/films.entity";
import { Images } from "src/images/entity/images.entity";
import { Planets } from "src/planets/entity/planets.entity";
import { Species } from "src/species/entity/species.entity";
import { Starships } from "src/starships/entity/starships.entity";
import { Vehicles } from "src/vehicles/entity/vehicles.entity";

export class ReturnPeopleDto {
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

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    homeworld: Planets[] | string[]

    @Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
    films: Films[] | string[]

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
    vehicles: Vehicles[] | string[]

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
    images: Images[] | string[]

}