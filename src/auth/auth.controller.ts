import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/signup")
    createUser(@Body() inputUser: CreateUserDto): Promise<void> {
        return this.authService.signUp(inputUser);
    }

}
