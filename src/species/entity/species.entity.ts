import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Planets } from "../../planets/entity/planets.entity";
import { Films } from "../../films/entity/films.entity";
import { People } from "../../peoples/entity/people.entity";
import { Images } from "../../images/entity/images.entity";

@Entity()
export class Species {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
    name: string

	@Column()
    classification: string
	
	@Column()
	designation: string

	@Column()
	average_heigh: number

	@Column()
	skin_colors: string

	@Column()
	eye_colors: string

    @Column()
    hair_colors: string

	@Column()
	average_lifespan: number

	@OneToOne(() => Planets)
	@JoinColumn({ name: "planets_id" })
	planet: Planets

    @Column()
    language: string

    @ManyToMany(() => People, (people) => people.species, {
		onDelete: 'CASCADE'
	})
	people: People[]

	@ManyToMany(() => Films, (films) => films.species, {
		onDelete: 'CASCADE'
	})
	films: Films[]

	@Column()
	url: string
}