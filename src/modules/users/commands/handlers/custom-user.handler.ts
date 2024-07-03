// // src/email/handlers/send-welcome-email.handler.ts
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
// import { CustomUserEvent } from '../../events/custom-user.event';

// @EventsHandler(CustomUserEvent)
// export class SendWelcomeEmailHandler implements IEventHandler<CustomUserEvent> {
//   constructor(private readonly sersService: UsersService) {}

//   async handle(event: CustomUserEvent) {
//     const { email } = event;
//     await this.usersService.sendWelcomeEmail(email);
//   }
// }
