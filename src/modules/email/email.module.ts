// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailService } from './email.service';
import { SendWelcomeEmailHandler } from './handlers/send-welcome-email.handler';
import { EmailController } from './email.controller';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './processors/email.processor';

@Module({
  imports: [CqrsModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, SendWelcomeEmailHandler, EmailProcessor],
})
export class EmailModule {}
