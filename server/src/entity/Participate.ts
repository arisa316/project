import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Entity()
export class Participate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User) // Set eager: true if you want to load the conversation along with the message
    @JoinColumn({ name: 'userId' }) // Specify the join column
    user: User;

    @Column({ name: 'userId' }) // Define the column for storing conversation ID
    userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(() => Conversation) // Set eager: true if you want to load the conversation along with the message
    @JoinColumn({ name: 'conversationId' }) // Specify the join column
    conversation: Conversation;





    // @Column()
    // user: number;

    // @Column()
    // conversation: number;

    // @ManyToOne(() => User, user => user.participations)
    // user: User;

    // @ManyToOne(() => Conversation, conversation => conversation.participations)
    // conversation: Conversation;
}
