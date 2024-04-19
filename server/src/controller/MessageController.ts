import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Message } from "../entity/Message"
import { Conversation } from "../entity/Conversation"

export class MassageController {

    private messageRepository = AppDataSource.getRepository(Message)

    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.messageRepository.find({ relations: ['conversation', 'user']})
    // }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //     const message = await this.messageRepository.findOne({
    //         where: { id }
    //     })
    //     return message
    // }

    async all(request: Request, response: Response, next: NextFunction) {
        const conversationId = parseInt(request.params.conversationId);
        console.log(conversationId);
        try {
            const message = await this.messageRepository.find({
                where: { conversationId }, // Correct syntax for filtering by userId
                relations: ['conversation', 'user'],
                order: { id: 'ASC' }
            });
            return message
          
        } catch (error) {
            return response.status(500).json({ message: "Internal server error" });
        }
    }


    async save(request: Request, response: Response, next: NextFunction) {
        const { conversationId, user, content } = request.body;
        const message = Object.assign(new Message(), {
            conversationId, user, content 
        })
        return this.messageRepository.save(message)
    }
}

    

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })
    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //     let userToRemove = await this.userRepository.findOneBy({ id })
    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }
    //     await this.userRepository.remove(userToRemove)
    //     return "user has been removed"
    // }

