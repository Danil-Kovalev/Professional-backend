import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Planets } from "./planets.entity";
import { Films } from "./films.entity";
import { Vehicles } from "./vehicles.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";

@Entity()
export class People {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	height: number

	@Column()
	mass: number

	@Column()
	hair_color: string

	@Column()
	skin_color: string

	@Column()
	eye_color: string

	@Column()
	birth_year: string

	@Column()
	gender: string

	@ManyToMany(() => Planets, (planets) => planets.residents)
	@JoinTable({
		name: "peoples_planets",
		joinColumn: {
			name: 'people_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'planets_id',
			referencedColumnName: 'id',
		},
	})
	homeworld: Planets[]

	@ManyToMany(() => Films, (films) => films.characters)
	@JoinTable({
		name: "peoples_films",
		joinColumn: {
			name: 'peoples_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'films_id',
			referencedColumnName: 'id',
		},
	})
	films: Films[]

	@ManyToMany(() => Species, (species) => species.people)
	@JoinTable({
		name: "peoples_species",
		joinColumn: {
			name: 'people_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'species_id',
			referencedColumnName: 'id',
		},
	})
	species: Species[]

	@ManyToMany((type) => Vehicles, (vehicles) => vehicles.pilots)
	@JoinTable({
		name: "peoples_vehicles",
		joinColumn: {
			name: 'people_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'vehicles_id',
			referencedColumnName: 'id',
		},
	})
	vehicles: Vehicles[]

	@ManyToMany(() => Starships, (starships) => starships.pilots)
	@JoinTable({
		name: "peoples_starships",
		joinColumn: {
			name: 'people_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'starships_id',
			referencedColumnName: 'id',
		},
	})
	starships: Starships[]
}