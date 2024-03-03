import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { Images } from "./images.entity";

@Entity()
export class Starships {

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

    @Column()
    hyperdrive_rating: number

    @Column()
    MGLT: number

    @Column()
    starship_class: string

	@ManyToMany(() => People, (people) => people.starships, {
		onDelete: 'CASCADE'
	})
	pilots: People[]

	@ManyToMany(() => Films, (films) => films.starships, {
		onDelete: 'CASCADE'
	})
	films: Films[]

	@Column()
	url: string
}