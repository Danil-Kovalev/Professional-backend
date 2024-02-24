import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { People } from "../people.entity";
import { Vehicles } from "../vehicles.entity";

@Entity()
export class PeoplesVehicles {

    @PrimaryColumn()
    people_id: number

    @PrimaryColumn()
    vehicles_id: number

    @ManyToOne(() => People, (peoples) => peoples.homeworld)
    @JoinColumn([{name: 'people_id', referencedColumnName: 'id'}])
    peoples: People[]

    @ManyToOne(() => Vehicles, (vehicles) => vehicles.pilots)
    @JoinColumn([{name: 'vehicles_id', referencedColumnName: 'id'}])
    vehicles: Vehicles[]
}