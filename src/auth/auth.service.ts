import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    private async createUser(signUpDto: SignUpDto): Promise<void> {
        const {firstName, surName, email, password} = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            firstName,
            surName,
            email,
            password: hashedPassword
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException(`User with email ${email} already exists`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    //TODO: check out alternative to bcrypt is argon (reccomended by reddit)
    async signUp(signUpDto: SignUpDto): Promise<void> {
        return this.createUser(signUpDto);
    }

    async logIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload>{
        const { email, password } = authCredentialsDto;

        const user = await this.userRepository.findOne({
            where: [{email}]
        })

        if (user && await bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { email };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
