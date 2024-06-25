// src/email/email.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // Logic to send a welcome email
    console.log(`Sending welcome email to ${email}`);
    // Here you would typically integrate with an email provider
  }
}
