import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { People } from "../people.entity";
import { Planets } from "../planets.entity";

@Entity()
export class PeoplesPlanets {

    @PrimaryColumn()
    people_id: number

    @PrimaryColumn()
    planets_id: number

    @ManyToOne(() => People, (peoples) => peoples.homeworld)
    @JoinColumn([{name: 'people_id', referencedColumnName: 'id'}])
    peoples: People[]

    @ManyToOne(() => Planets, (planets) => planets.residents)
    @JoinColumn([{name: 'planets_id', referencedColumnName: 'id'}])
    planets: Planets[]
}