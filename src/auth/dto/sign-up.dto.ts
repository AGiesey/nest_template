import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {

    @IsString()
    firstName: string;

    @IsString()
    surName: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    //1 uppercase, 1 lowercase, 1 number, 1 special character
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
        message: 'Password must contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    })
    password: string;
}