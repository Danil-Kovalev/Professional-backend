import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "../films.entity";
import { Planets } from "../planets.entity";

@Entity()
export class FilmsPlanets {

    @PrimaryColumn()
    films_id: number

    @PrimaryColumn()
    planets_id: number

    @ManyToOne(() => Films, (films) => films.starships)
    @JoinColumn([{name: 'films_id', referencedColumnName: 'id'}])
    films: Films[]

    @ManyToOne(() => Planets, (planets) => planets.films)
    @JoinColumn([{name: 'planets_id', referencedColumnName: 'id'}])
    planets: Planets[]
}