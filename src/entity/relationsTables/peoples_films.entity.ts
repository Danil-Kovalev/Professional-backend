import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { People } from "../people.entity";
import { Films } from "../films.entity";

@Entity()
export class PeoplesFilms {

    @PrimaryColumn()
    people_id: number

    @PrimaryColumn()
    films_id: number

    @ManyToOne(() => People, (peoples) => peoples.homeworld)
    @JoinColumn([{name: 'people_id', referencedColumnName: 'id'}])
    peoples: People[]

    @ManyToOne(() => Films, (films) => films.characters)
    @JoinColumn([{name: 'films_id', referencedColumnName: 'id'}])
    films: Films[]
}