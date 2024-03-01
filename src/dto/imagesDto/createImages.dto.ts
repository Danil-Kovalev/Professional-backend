import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateImagesDto {

    @Type(() => Number)
    @ApiProperty({ required: false })
    @IsNumber()
    idPeople: number

    @Type(() => File)
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File
}