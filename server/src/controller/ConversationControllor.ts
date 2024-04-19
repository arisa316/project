import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Conversation } from "../entity/Conversation"

export class ConversationController {

    private conversationRepository = AppDataSource.getRepository(Conversation)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.conversationRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, type, image } = request.body;
        const conversation = Object.assign(new Conversation(), {
            name, type, image
        })
        return this.conversationRepository.save(conversation)
    }
}
