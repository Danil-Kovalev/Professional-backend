import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "../films.entity";
import { Starships } from "../starships.entity";

@Entity()
export class FilmsStarships {

    @PrimaryColumn()
    films_id: number

    @PrimaryColumn()
    starships_id: number

    @ManyToOne(() => Films, (films) => films.starships)
    @JoinColumn([{name: 'films_id', referencedColumnName: 'id'}])
    films: Films[]

    @ManyToOne(() => Starships, (starships) => starships.films)
    @JoinColumn([{name: 'starships_id', referencedColumnName: 'id'}])
    starships: Starships[]
}