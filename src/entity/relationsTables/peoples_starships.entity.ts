import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { People } from "../people.entity";
import { Starships } from "../starships.entity";

@Entity()
export class PeoplesStarships {

    @PrimaryColumn()
    people_id: number

    @PrimaryColumn()
    starships_id: number

    @ManyToOne(() => People, (peoples) => peoples.homeworld)
    @JoinColumn([{name: 'people_id', referencedColumnName: 'id'}])
    peoples: People[]

    @ManyToOne(() => Starships, (starships) => starships.pilots)
    @JoinColumn([{name: 'starships_id', referencedColumnName: 'id'}])
    starships: Starships[]
}