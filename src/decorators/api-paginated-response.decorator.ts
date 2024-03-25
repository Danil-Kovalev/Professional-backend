import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../dto/pageDto/page.dto";
import { ReturnPeopleDto } from "../dto/peoplesDto/returnPeople.dto";
import { ReturnPlanetsDto } from "../dto/planetsDto/returnPlanetsDto.dto";
import { ReturnFilmsDto } from "../dto/filmsDto/returnFilmsDto.dto";
import { ReturnSpeciesDto } from "../dto/speciesDto/returnSpeciesDto.dto";
import { ReturnStarshipsDto } from "../dto/starshipsDto/returnStarshipsDto.dto";
import { ReturnVehiclesDto } from "../dto/vehiclesDto/returnVehiclesDto.dto";


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