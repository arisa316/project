import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Participate } from "../entity/Participate"


export class ParticipateController {

    private participateRepository = AppDataSource.getRepository(Participate)

    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.participateRepository.find({ relations: ['conversation', 'user']})
    // }

    async save(request: Request, response: Response, next: NextFunction) {
        const { userId , conversation } = request.body;
        const participate = Object.assign(new Participate(), {
            userId, conversation 
        })
        return this.participateRepository.save(participate)
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

    async all(request: Request, response: Response, next: NextFunction) {
        const userId = parseInt(request.params.userId);
        console.log(userId);
        try {
            const participations = await this.participateRepository.find({
                where: { userId }, // Correct syntax for filtering by userId
                relations: ['conversation', 'user']
            });
            return participations
            // console.log(request.status(200).json(participations))
            // return response.json({ participations);
            // return response.status(200).json(participations);
        } catch (error) {
            console.log("e")
            return response.status(500).json({ message: "Internal server error" });
        }
    }
    
    
}