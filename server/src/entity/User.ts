// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Conversation } from "./Conversation";
import { Participate } from "./Participate";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    image: string;

    // @OneToMany(() => Participate, participate => participate.user)
    // participations: Participate[];
  
}
