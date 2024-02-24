import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { People } from "../people.entity";
import { Species } from "../species.entity";

@Entity()
export class PeoplesSpecies {

    @PrimaryColumn()
    people_id: number

    @PrimaryColumn()
    species_id: number

    @ManyToOne(() => People, (peoples) => peoples.homeworld)
    @JoinColumn([{name: 'people_id', referencedColumnName: 'id'}])
    peoples: People[]

    @ManyToOne(() => Species, (species) => species.people)
    @JoinColumn([{name: 'species_id', referencedColumnName: 'id'}])
    species: Species[]
}