import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController { 
    constructor(private authServcie : AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void> {
        console.log(authCredentialDto);
        return this.authServcie.signUp(authCredentialDto);
    }
    
    @Post('/signin') 
    signIn(@Body(ValidationPipe) authServcie: AuthCredentialDto) : Promise<{ accessToken : string }> {
        return this.authServcie.signIn(authServcie);
    }
    

    @Post('/info')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        delete user.password;
        return user;
    } 
}
