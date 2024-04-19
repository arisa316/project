import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Participate } from "./Participate";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    image: string;

    // @OneToMany(() => Participate, participate => participate.conversation)
    // participations: Participate[];
}
