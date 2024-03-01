import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "./people.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @ManyToOne(() => People, (people) => people.images, {
        onDelete: 'CASCADE'
    })
    people: People
}