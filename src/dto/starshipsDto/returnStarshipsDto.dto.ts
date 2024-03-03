import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"
import { Films } from "src/entity/films.entity"
import { People } from "src/entity/people.entity"

export class ReturnStarshipsDto {
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

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    hyperdrive_rating: number

    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    MGLT: number

    @Type(() => String)
    @IsString()
    @ApiProperty()
    starship_class: string

	@Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	pilots: People[] | string[]

	@Type(() => Array<string>)
    @IsString({
        each: true
    })
    @ApiProperty()
	films: Films[] | string[]
}