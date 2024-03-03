import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ReturnFilmsDto } from "src/dto/filmsDto/returnFilmsDto.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { ReturnPeopleDto } from "src/dto/peoplesDto/returnPeople.dto";
import { ReturnPlanetsDto } from "src/dto/planetsDto/returnPlanetsDto.dto";
import { ReturnSpeciesDto } from "src/dto/speciesDto/returnSpeciesDto.dto";
import { ReturnStarshipsDto } from "src/dto/starshipsDto/returnStarshipsDto.dto";
import { ReturnVehiclesDto } from "src/dto/vehiclesDto/returnVehiclesDto.dto";

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