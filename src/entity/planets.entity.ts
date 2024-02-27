import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { People } from "./people.entity";
import { Films } from "./films.entity";
import { Images } from "./images.entity";

@Entity()
export class Planets {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
    name: string

	@Column()
    rotation_period: number
	
	@Column()
	orbital_period: number

	@Column()
	diameter: number

	@Column()
	climate: string

	@Column()
	gravity: string

	@Column()
	terrain: string

	@Column()
	surface_water: number

    @Column()
    population: number

    @ManyToMany(() => People, (people) => people.homeworld, {
		onDelete: 'CASCADE'
	})
    residents: People[]

	@ManyToMany(() => Films, (films) => films.planets, {
		onDelete: 'CASCADE'
	})
    films: Films[]
}