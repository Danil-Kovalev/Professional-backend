import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Vehicles {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
    name: string

	@Column()
    model: string
	
	@Column()
	manufacturer: string

	@Column()
	cost_in_credits: number

	@Column()
	length: number

	@Column()
	max_atmosphering_speed: number

	@Column()
	crew: number

	@Column()
	passengers: number

    @Column()
    cargo_capacity: number

    @Column()
    consumables: string

    @ManyToMany(() => People, (people) => people.vehicles)
	pilots: People[]

	@ManyToMany(() => Films, (films) => films.vehicles)
	films: Films[]
}