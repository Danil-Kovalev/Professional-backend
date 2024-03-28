import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class CreateFilmsDto {
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

    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
    charactersIds: number[]

    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
	starshipsIds: number[]

    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
	vehiclesIds: number[]

    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
	speciesIds: number[]
	
    @Type(() => Array<number>)
    @IsNumber({}, {
        each: true
    })
    @ApiProperty()
    planetsIds: number[]
}