import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { People } from "../../peoples/entity/people.entity";
import { Planets } from "../../planets/entity/planets.entity";
import { Starships } from "../../starships/entity/starships.entity";
import { Vehicles } from "../../vehicles/entity/vehicles.entity";
import { Species } from "../../species/entity/species.entity";
import { Images } from "../../entity/images.entity";

@Entity()
export class Films {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    episode_id: number

    @Column()
    opening_crawl: string

    @Column()
    director: string

    @Column()
    producer: string

    @Column()
    release_date: Date

    @ManyToMany((type) => People, (people) => people.films)
    characters: People[]

    @ManyToMany(() => Starships, (starships) => starships.films)
	@JoinTable({
        name: "films_starships",
		joinColumn: {
			name: 'films_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'starships_id',
			referencedColumnName: 'id',
		}
    })
	starships: Starships[]

    @ManyToMany((type) => Vehicles, (vehicles) => vehicles.films)
	@JoinTable({
        name: "films_vehicles",
		joinColumn: {
			name: 'films_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'vehicles_id',
			referencedColumnName: 'id',
		}
    })
	vehicles: Vehicles[]

    @ManyToMany(() => Species, (species) => species.films)
	@JoinTable({
        name: "films_species",
		joinColumn: {
			name: 'films_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'species_id',
			referencedColumnName: 'id',
		}
    })
	species: Species[]
	
    @ManyToMany(() => Planets, (planets) => planets.films)
    @JoinTable({
        name: "films_planets",
		joinColumn: {
			name: 'films_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'planets_id',
			referencedColumnName: 'id',
		}
    })
    planets: Planets[]

	@Column()
	url: string
}