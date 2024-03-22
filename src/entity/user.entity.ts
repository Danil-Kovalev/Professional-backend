import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Role } from "src/auth/roles/role.enum";

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: Role

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }
	
}