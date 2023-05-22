import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor( private userRepository : UserRepository ) {}
    
    async signUp(authCredentailDto : AuthCredentialDto) : Promise<void> {
        return this.userRepository.createUser(authCredentailDto);
    }

    async signIn(authCredentailDto : AuthCredentialDto) : Promise<{ accessToken : string}> {
        return this.userRepository.signIn(authCredentailDto);
    }


}
