import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number

    @Column()
    username: string

    @Column()
    password: string

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    // @Column()
    // role: Role
	
}