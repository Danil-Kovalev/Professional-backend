import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "../films.entity";
import { Species } from "../species.entity";

@Entity()
export class FilmsSpecies {

    @PrimaryColumn()
    films_id: number

    @PrimaryColumn()
    species_id: number

    @ManyToOne(() => Films, (films) => films.starships)
    @JoinColumn([{name: 'films_id', referencedColumnName: 'id'}])
    films: Films[]

    @ManyToOne(() => Species, (species) => species.films)
    @JoinColumn([{name: 'species_id', referencedColumnName: 'id'}])
    species: Species[]
}