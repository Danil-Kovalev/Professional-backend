import { Type } from "class-transformer";
import { IsNumber, IsString, Matches } from "class-validator";

export class CreateImagesDto {

    @Type(() => Number)
    @IsNumber()
    id: number

    @Type(() => String)
    @IsString()
    @Matches('/.[jpeg | jpg | png]/g')
    url: string
}