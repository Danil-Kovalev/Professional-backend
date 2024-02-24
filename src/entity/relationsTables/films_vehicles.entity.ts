import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "../films.entity";
import { Vehicles } from "../vehicles.entity";

@Entity()
export class FilmsVehicles {

    @PrimaryColumn()
    films_id: number

    @PrimaryColumn()
    vehicles_id: number

    @ManyToOne(() => Films, (films) => films.starships)
    @JoinColumn([{name: 'films_id', referencedColumnName: 'id'}])
    films: Films[]

    @ManyToOne(() => Vehicles, (vehicles) => vehicles.films)
    @JoinColumn([{name: 'vehicles_id', referencedColumnName: 'id'}])
    vehicles: Vehicles[]
}