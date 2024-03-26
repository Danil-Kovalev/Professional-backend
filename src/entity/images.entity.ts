import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "../peoples/entity/people.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    urlImage: string

    @Column()
    urlAPI: string

    @ManyToOne(() => People, (people) => people.images, {
        onDelete: 'CASCADE'
    })
    people: People
}