import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.logIn(authCredentialsDto);
    }
}
