import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor {
  @Process('sendEmail')
  async handleEmailJob(job: Job<any>) {
    console.log('Sending email to', job.data.email);

    if(job.data.email == 5){
      // Close the NestJS application
    // await this.app.close();

    // Exit the process
    process.exit(0);
    }
    // logic to send email
    // setTimeout(() => {
    //   // console.log("Delayed for 1 second.");
    //   console.log('Sending email to', job.data.email);
    // }, 5000);
  }

  @Process('sendEmail2')
  async handleEmailJob2(job: Job<any>) {
    console.log('Sending email to', job.data.email);
    // logic to send email
    // setTimeout(() => {
    //   // console.log("Delayed for 1 second.");
    //   console.log('Sending email to', job.data.email);
    // }, 5000);
  }
}
