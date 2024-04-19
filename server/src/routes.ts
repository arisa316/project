import { UserController } from "./controller/UserController"
import { MassageController } from "./controller/MessageController"
import { ConversationController } from "./controller/ConversationControllor"
import { ParticipateController } from "./controller/ParticipateControllor"

export const Routes = [
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
},
//  {
//     method: "get",
//     route: "/messages/:id",
//     controller: MassageController,
//     action: "one"
// },
 {
    method: "get",
    route: "/messages/:conversationId",
    controller: MassageController,
    action: "all"
}, {
    method: "post",
    route: "/messages",
    controller: MassageController,
    action: "save"
}, {
    method: "get",
    route: "/conversations",
    controller: ConversationController,
    action: "all"
}, {
    method: "post",
    route: "/conversations",
    controller: ConversationController,
    action: "save"
}, {
    method: "get",
    route: "/participates/:userId",
    controller: ParticipateController,
    action: "all"
}, {
    method: "post",
    route: "/participates",
    controller: ParticipateController,
    action: "save"
}]
