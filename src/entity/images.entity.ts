import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "./people.entity";
import { Species } from "./species.entity";
import { Films } from "./films.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => People, (people) => people.images)
    people: People

    @ManyToOne(() => Species, (species) => species.images)
    species: Species

    @ManyToOne(() => Films, (films) => films.images)
    films: Films

    @ManyToOne(() => Starships, (starships) => starships.images)
    starships: Starships

    @ManyToOne(() => Vehicles, (vehicles) => vehicles.images)
    vehicles: Vehicles
}