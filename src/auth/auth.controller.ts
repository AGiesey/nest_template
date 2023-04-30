import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    private logger = new Logger("AuthController", {timestamp: true});
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        this.logger.verbose(`New user signup request with values: "${JSON.stringify({
            email: signUpDto.email,
            first_name: signUpDto.firstName,
            last_name: signUpDto.surName,
        })}"`)
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload> {
        this.logger.verbose(`Login attempt for user with email "${authCredentialsDto.email}"`);
        return this.authService.logIn(authCredentialsDto);
    }
}
