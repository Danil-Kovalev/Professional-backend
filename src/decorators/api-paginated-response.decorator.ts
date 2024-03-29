import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../dto/pageDto/page.dto";
import { ReturnPeopleDto } from "../peoples/dto/returnPeople.dto";
import { ReturnPlanetsDto } from "../planets/dto/returnPlanetsDto.dto";
import { ReturnFilmsDto } from "../films/dto/returnFilmsDto.dto";
import { ReturnSpeciesDto } from "../species/dto/returnSpeciesDto.dto";
import { ReturnStarshipsDto } from "../starships/dto/returnStarshipsDto.dto";
import { ReturnVehiclesDto } from "../vehicles/dto/returnVehiclesDto.dto";


export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto, ReturnPeopleDto, ReturnPlanetsDto, ReturnFilmsDto, ReturnSpeciesDto, ReturnStarshipsDto, ReturnVehiclesDto),
    ApiOkResponse({
      description: "Successfully received model list",
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};