import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class ImagesDto {
    @Type(() => String)
    @IsString()
    url: string
}