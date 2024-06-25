import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../users/commands/impl/signup.command';
import { UserSignUpDto } from '../users/dtos/user-signup.dto';

@Controller('email')
export class EmailController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post('signup')
    async signup(@Body() userSignUpDto: UserSignUpDto) {
        return this.commandBus.execute(new SignUpCommand(userSignUpDto));
    }

}
