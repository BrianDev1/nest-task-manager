import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() inputUser: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(inputUser);
  }

  @Post('/signIn')
  signIn(
    @Body() inputUser: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(inputUser);
  }
}
