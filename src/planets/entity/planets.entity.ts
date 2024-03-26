import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { People } from "../../peoples/entity/people.entity";
import { Films } from "../../films/entity/films.entity";
import { Images } from "../../entity/images.entity";

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

	@Column()
	url: string
}