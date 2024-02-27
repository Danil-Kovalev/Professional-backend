import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "./people.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => People, (people) => people.images)
    people: People
}