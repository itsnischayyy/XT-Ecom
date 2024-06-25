// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailService } from './email.service';
import { SendWelcomeEmailHandler } from './handlers/send-welcome-email.handler';
import { EmailController } from './email.controller';

@Module({
  imports: [CqrsModule],
  controllers: [EmailController],
  providers: [EmailService, SendWelcomeEmailHandler],
})
export class EmailModule {}
