// Message.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

        // Define the ManyToOne relationship with Conversation
        @ManyToOne(() => Conversation) // Set eager: true if you want to load the conversation along with the message
        @JoinColumn({ name: 'conversationId' }) // Specify the join column
        conversation: Conversation;
    
        @Column({ name: 'conversationId' }) // Define the column for storing conversation ID
        conversationId: number;
    
        @ManyToOne(() => User)
        user: User;
    
        @Column()
        content: string;

    // @ManyToOne(() => Conversation)
    // conversation: Conversation;

    // conversationId: number

    // @ManyToOne(() => User)
    // user: User;

    // // @Column()
    // // conversation: number;

    // // @Column()
    // // user: number;

    // @Column()
    // content: string;



}
