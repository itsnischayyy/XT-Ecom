// src/email/handlers/send-welcome-email.handler.ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../../users/events/user-registered.event';
import { EmailService } from '../email.service';

@EventsHandler(UserRegisteredEvent)
export class SendWelcomeEmailHandler implements IEventHandler<UserRegisteredEvent> {
  constructor(private readonly emailService: EmailService) {}

  async handle(event: UserRegisteredEvent) {
    const { email } = event;
    await this.emailService.sendWelcomeEmail(email);
  }
}
